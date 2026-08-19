"use client";

import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from "react";
import {
  CandidateProfile,
  TargetJob,
  InterviewQuestion,
  InterviewCategory,
  ParsedResumeData,
  AtsAnalysisResult,
  RoadmapMilestone,
} from "@/lib/types";
import { CANDIDATE_PROFILES, TARGET_JOBS } from "@/lib/careerData";
import { parseResumeText, calculateAtsScore } from "@/lib/atsEngine";
import {
  EXTENDED_INTERVIEW_QUESTIONS,
  evaluateInterviewAnswer,
  InterviewEvaluationResult,
} from "@/lib/interviewEngine";

interface SavedInterviewRecord {
  questionId: string;
  answer: string;
  result: InterviewEvaluationResult;
  timestamp: number;
}

interface CareerContextType {
  // 1. Profile & Target Job State
  selectedProfileId: string;
  selectedJobId: string;
  activeProfile: CandidateProfile;
  activeJob: TargetJob;
  selectProfile: (profileId: string) => void;
  selectJob: (jobId: string) => void;

  // 2. Resume & ATS Engine State
  parsedResume: ParsedResumeData;
  atsAnalysis: AtsAnalysisResult;
  appliedSuggestionIds: string[];
  uploadCustomResume: (fileName: string, rawText: string) => void;
  resetToProfileResume: () => void;
  toggleSuggestion: (suggestionId: string) => void;

  // 3. Skill Gap Radar & Dynamic Scores
  computedResumeScore: number;
  computedAtsScore: number;
  computedKeywordMatch: number;
  appliedScoreBoost: number;

  // 4. Learning Roadmap State
  completedRoadmapIds: number[];
  roadmapProgressPercent: number;
  toggleRoadmapMilestone: (milestoneId: number) => void;
  completeAllMilestones: () => void;
  resetRoadmapMilestones: () => void;

  // 5. Interview Preparation State
  activeInterviewCategory: InterviewCategory;
  activeQuestion: InterviewQuestion;
  categoryQuestions: InterviewQuestion[];
  userAnswerInput: string;
  setUserAnswerInput: (val: string) => void;
  currentEvaluation: InterviewEvaluationResult | null;
  savedInterviewRecords: Record<string, SavedInterviewRecord>;
  interviewStats: {
    totalAttempted: number;
    avgScore: number;
    passedCount: number;
    categoryCompletionPercent: number;
  };
  selectInterviewCategory: (cat: InterviewCategory) => void;
  selectQuestion: (qId: string) => void;
  submitCurrentAnswer: (answerText?: string) => InterviewEvaluationResult;
  nextQuestion: () => void;
  resetInterviewCategoryProgress: () => void;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export function CareerProvider({ children }: { children: ReactNode }) {
  // Profiles & Jobs
  const [selectedProfileId, setSelectedProfileId] = useState<string>("alex-chen");
  const [selectedJobId, setSelectedJobId] = useState<string>("job-frontend");

  // Active Profile & Job derived objects
  const activeProfile = useMemo(() => {
    return CANDIDATE_PROFILES.find((p) => p.id === selectedProfileId) || CANDIDATE_PROFILES[0];
  }, [selectedProfileId]);

  const activeJob = useMemo(() => {
    return TARGET_JOBS.find((j) => j.id === selectedJobId) || TARGET_JOBS[0];
  }, [selectedJobId]);

  // Resume Parsing State
  const [customResume, setCustomResume] = useState<ParsedResumeData | null>(null);
  const [appliedSuggestionIds, setAppliedSuggestionIds] = useState<string[]>([]);

  // Current parsed resume (custom or active profile default)
  const parsedResume = useMemo(() => {
    if (customResume) return customResume;
    return parseResumeText(activeProfile.sampleResumeText, `${activeProfile.name.toLowerCase().replace(/\s+/g, "_")}_resume.pdf`);
  }, [customResume, activeProfile]);

  // Real-time ATS & Lexical Analysis
  const atsAnalysis = useMemo(() => {
    return calculateAtsScore(parsedResume, activeJob);
  }, [parsedResume, activeJob]);

  // Applied score boost from interactive fixes
  const appliedScoreBoost = useMemo(() => {
    return activeProfile.suggestions
      .filter((s) => appliedSuggestionIds.includes(s.id))
      .reduce((sum, s) => sum + (parseInt(s.impactScore) || 0), 0);
  }, [activeProfile.suggestions, appliedSuggestionIds]);

  // Dynamically computed final scores
  const computedResumeScore = useMemo(() => {
    return Math.min(99, atsAnalysis.overallScore + Math.floor(appliedScoreBoost * 0.4));
  }, [atsAnalysis.overallScore, appliedScoreBoost]);

  const computedAtsScore = useMemo(() => {
    return Math.min(99, atsAnalysis.atsScore + Math.floor(appliedScoreBoost * 0.3));
  }, [atsAnalysis.atsScore, appliedScoreBoost]);

  const computedKeywordMatch = useMemo(() => {
    return Math.min(99, atsAnalysis.keywordMatchScore + Math.floor(appliedScoreBoost * 0.25));
  }, [atsAnalysis.keywordMatchScore, appliedScoreBoost]);

  // Learning Roadmap State with LocalStorage
  const [completedRoadmapIds, setCompletedRoadmapIds] = useState<number[]>([1]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`nexa_roadmap_${selectedProfileId}`);
      if (stored) {
        try {
          setCompletedRoadmapIds(JSON.parse(stored));
        } catch {
          setCompletedRoadmapIds([1]);
        }
      } else {
        const initialDone = activeProfile.roadmapMilestones
          .filter((m) => m.status === "completed")
          .map((m) => m.id);
        setCompletedRoadmapIds(initialDone.length > 0 ? initialDone : [1]);
      }
    }
  }, [selectedProfileId, activeProfile.roadmapMilestones]);

  const roadmapProgressPercent = useMemo(() => {
    const total = activeProfile.roadmapMilestones.length;
    if (total === 0) return 0;
    const doneCount = activeProfile.roadmapMilestones.filter((m) =>
      completedRoadmapIds.includes(m.id)
    ).length;
    return Math.round((doneCount / total) * 100);
  }, [activeProfile.roadmapMilestones, completedRoadmapIds]);

  // Interview Simulator State with LocalStorage
  const [activeInterviewCategory, setActiveInterviewCategory] = useState<InterviewCategory>("frontend");
  const [activeQuestionId, setActiveQuestionId] = useState<string>("fe-1");
  const [userAnswerInput, setUserAnswerInput] = useState<string>("");
  const [currentEvaluation, setCurrentEvaluation] = useState<InterviewEvaluationResult | null>(null);
  const [savedInterviewRecords, setSavedInterviewRecords] = useState<Record<string, SavedInterviewRecord>>({});

  // Load saved interview answers from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexa_interview_records");
      if (stored) {
        try {
          setSavedInterviewRecords(JSON.parse(stored));
        } catch {
          setSavedInterviewRecords({});
        }
      }
    }
  }, []);

  // Filter questions for active category
  const categoryQuestions = useMemo(() => {
    const filtered = EXTENDED_INTERVIEW_QUESTIONS.filter((q) => q.category === activeInterviewCategory);
    return filtered.length > 0 ? filtered : EXTENDED_INTERVIEW_QUESTIONS.slice(0, 2);
  }, [activeInterviewCategory]);

  // Active question object
  const activeQuestion = useMemo(() => {
    const found = categoryQuestions.find((q) => q.id === activeQuestionId);
    return found || categoryQuestions[0] || EXTENDED_INTERVIEW_QUESTIONS[0];
  }, [categoryQuestions, activeQuestionId]);

  // Synchronize active evaluation when question switches
  useEffect(() => {
    if (savedInterviewRecords[activeQuestion.id]) {
      setUserAnswerInput(savedInterviewRecords[activeQuestion.id].answer);
      setCurrentEvaluation(savedInterviewRecords[activeQuestion.id].result);
    } else {
      setUserAnswerInput("");
      setCurrentEvaluation(null);
    }
  }, [activeQuestion.id, savedInterviewRecords]);

  // Interview Statistics Calculation
  const interviewStats = useMemo(() => {
    const records = Object.values(savedInterviewRecords);
    const categoryRecords = records.filter((r) =>
      categoryQuestions.some((q) => q.id === r.questionId)
    );

    const totalAttempted = records.length;
    const avgScore =
      records.length > 0
        ? Math.round(records.reduce((sum, r) => sum + r.result.score, 0) / records.length)
        : 0;
    const passedCount = records.filter((r) => r.result.isPassed).length;

    const categoryCompletionPercent =
      categoryQuestions.length > 0
        ? Math.round((categoryRecords.length / categoryQuestions.length) * 100)
        : 0;

    return {
      totalAttempted,
      avgScore,
      passedCount,
      categoryCompletionPercent,
    };
  }, [savedInterviewRecords, categoryQuestions]);

  // Actions
  const selectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setCustomResume(null);
    setAppliedSuggestionIds([]);
  };

  const selectJob = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const uploadCustomResume = (fileName: string, rawText: string) => {
    const parsed = parseResumeText(rawText, fileName);
    setCustomResume(parsed);
    setAppliedSuggestionIds([]);
  };

  const resetToProfileResume = () => {
    setCustomResume(null);
    setAppliedSuggestionIds([]);
  };

  const toggleSuggestion = (suggestionId: string) => {
    setAppliedSuggestionIds((prev) =>
      prev.includes(suggestionId)
        ? prev.filter((id) => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const toggleRoadmapMilestone = (milestoneId: number) => {
    setCompletedRoadmapIds((prev) => {
      const updated = prev.includes(milestoneId)
        ? prev.filter((id) => id !== milestoneId)
        : [...prev, milestoneId];

      if (typeof window !== "undefined") {
        localStorage.setItem(`nexa_roadmap_${selectedProfileId}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const completeAllMilestones = () => {
    const allIds = activeProfile.roadmapMilestones.map((m) => m.id);
    setCompletedRoadmapIds(allIds);
    if (typeof window !== "undefined") {
      localStorage.setItem(`nexa_roadmap_${selectedProfileId}`, JSON.stringify(allIds));
    }
  };

  const resetRoadmapMilestones = () => {
    setCompletedRoadmapIds([]);
    if (typeof window !== "undefined") {
      localStorage.setItem(`nexa_roadmap_${selectedProfileId}`, JSON.stringify([]));
    }
  };

  const selectInterviewCategory = (cat: InterviewCategory) => {
    setActiveInterviewCategory(cat);
    const questions = EXTENDED_INTERVIEW_QUESTIONS.filter((q) => q.category === cat);
    if (questions.length > 0) {
      setActiveQuestionId(questions[0].id);
    }
  };

  const selectQuestion = (qId: string) => {
    setActiveQuestionId(qId);
  };

  const submitCurrentAnswer = (answerText?: string) => {
    const textToEvaluate = answerText !== undefined ? answerText : userAnswerInput;
    const result = evaluateInterviewAnswer(activeQuestion, textToEvaluate);
    setCurrentEvaluation(result);

    const record: SavedInterviewRecord = {
      questionId: activeQuestion.id,
      answer: textToEvaluate,
      result,
      timestamp: Date.now(),
    };

    setSavedInterviewRecords((prev) => {
      const updated = { ...prev, [activeQuestion.id]: record };
      if (typeof window !== "undefined") {
        localStorage.setItem("nexa_interview_records", JSON.stringify(updated));
      }
      return updated;
    });

    return result;
  };

  const nextQuestion = () => {
    const currentIndex = categoryQuestions.findIndex((q) => q.id === activeQuestion.id);
    const nextIndex = (currentIndex + 1) % categoryQuestions.length;
    setActiveQuestionId(categoryQuestions[nextIndex].id);
  };

  const resetInterviewCategoryProgress = () => {
    setSavedInterviewRecords((prev) => {
      const updated = { ...prev };
      categoryQuestions.forEach((q) => {
        delete updated[q.id];
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("nexa_interview_records", JSON.stringify(updated));
      }
      return updated;
    });
    setUserAnswerInput("");
    setCurrentEvaluation(null);
  };

  return (
    <CareerContext.Provider
      value={{
        selectedProfileId,
        selectedJobId,
        activeProfile,
        activeJob,
        selectProfile,
        selectJob,
        parsedResume,
        atsAnalysis,
        appliedSuggestionIds,
        uploadCustomResume,
        resetToProfileResume,
        toggleSuggestion,
        computedResumeScore,
        computedAtsScore,
        computedKeywordMatch,
        appliedScoreBoost,
        completedRoadmapIds,
        roadmapProgressPercent,
        toggleRoadmapMilestone,
        completeAllMilestones,
        resetRoadmapMilestones,
        activeInterviewCategory,
        activeQuestion,
        categoryQuestions,
        userAnswerInput,
        setUserAnswerInput,
        currentEvaluation,
        savedInterviewRecords,
        interviewStats,
        selectInterviewCategory,
        selectQuestion,
        submitCurrentAnswer,
        nextQuestion,
        resetInterviewCategoryProgress,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareer must be used within a CareerProvider");
  }
  return context;
}
