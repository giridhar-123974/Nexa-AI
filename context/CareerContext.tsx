"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { CandidateProfile, TargetJob, InterviewQuestion, RoadmapMilestone } from "@/lib/types";
import { CANDIDATE_PROFILES, TARGET_JOBS, INTERVIEW_QUESTIONS } from "@/lib/careerData";

interface CareerContextType {
  // Selection states
  selectedProfileId: string;
  selectedJobId: string;
  activeInterviewCategory: string;
  activeQuestionId: string;
  
  // Dynamic mutations
  appliedSuggestionIds: string[];
  completedRoadmapIds: number[];
  
  // Computed objects
  activeProfile: CandidateProfile;
  activeJob: TargetJob;
  activeQuestion: InterviewQuestion;
  categoryQuestions: InterviewQuestion[];
  
  // Computed scores
  computedResumeScore: number;
  computedAtsScore: number;
  computedKeywordMatch: number;
  appliedScoreBoost: number;
  roadmapProgressPercent: number;

  // Actions
  selectProfile: (profileId: string) => void;
  selectJob: (jobId: string) => void;
  selectInterviewCategory: (category: string) => void;
  selectQuestion: (questionId: string) => void;
  toggleSuggestion: (suggestionId: string, impactScore: number) => void;
  toggleRoadmapMilestone: (milestoneId: number) => void;
  completeAllMilestones: () => void;
  resetRoadmapMilestones: () => void;
  resetToDefaults: () => void;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export function CareerProvider({ children }: { children: ReactNode }) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>("alex-chen");
  const [selectedJobId, setSelectedJobId] = useState<string>("job-stripe");
  const [activeInterviewCategory, setActiveInterviewCategory] = useState<string>("frontend");
  const [activeQuestionId, setActiveQuestionId] = useState<string>("fe-1");
  const [appliedSuggestionIds, setAppliedSuggestionIds] = useState<string[]>([]);
  const [completedRoadmapIds, setCompletedRoadmapIds] = useState<number[]>([1, 2]);

  // Derived Active Profile
  const activeProfile = useMemo(() => {
    return CANDIDATE_PROFILES.find((p) => p.id === selectedProfileId) || CANDIDATE_PROFILES[0];
  }, [selectedProfileId]);

  // Derived Active Job
  const activeJob = useMemo(() => {
    return TARGET_JOBS.find((j) => j.id === selectedJobId) || TARGET_JOBS[0];
  }, [selectedJobId]);

  // Derived Questions for category
  const categoryQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter((q) => q.category === activeInterviewCategory);
  }, [activeInterviewCategory]);

  // Derived Active Question
  const activeQuestion = useMemo(() => {
    const found = categoryQuestions.find((q) => q.id === activeQuestionId);
    return found || categoryQuestions[0] || INTERVIEW_QUESTIONS[0];
  }, [categoryQuestions, activeQuestionId]);

  // Computed Applied Score Boost
  const appliedScoreBoost = useMemo(() => {
    return activeProfile.suggestions
      .filter((s) => appliedSuggestionIds.includes(s.id))
      .reduce((sum, s) => sum + (parseInt(s.impactScore) || 0), 0);
  }, [activeProfile.suggestions, appliedSuggestionIds]);

  // Computed Scores
  const computedResumeScore = useMemo(() => {
    return Math.min(99, activeProfile.baseResumeScore + Math.floor(appliedScoreBoost * 0.4));
  }, [activeProfile.baseResumeScore, appliedScoreBoost]);

  const computedAtsScore = useMemo(() => {
    // Modify based on target job match
    const jobMod = activeJob.id === "job-stripe" && activeProfile.id === "alex-chen" ? 2 : -2;
    return Math.min(99, activeProfile.baseAtsScore + Math.floor(appliedScoreBoost * 0.3) + jobMod);
  }, [activeProfile.baseAtsScore, appliedScoreBoost, activeJob.id, activeProfile.id]);

  const computedKeywordMatch = useMemo(() => {
    return Math.min(99, activeProfile.baseKeywordMatch + Math.floor(appliedScoreBoost * 0.3));
  }, [activeProfile.baseKeywordMatch, appliedScoreBoost]);

  // Computed Roadmap Progress
  const roadmapProgressPercent = useMemo(() => {
    const total = activeProfile.roadmapMilestones.length;
    if (total === 0) return 0;
    const doneCount = activeProfile.roadmapMilestones.filter((m) =>
      completedRoadmapIds.includes(m.id)
    ).length;
    return Math.round((doneCount / total) * 100);
  }, [activeProfile.roadmapMilestones, completedRoadmapIds]);

  // Actions
  const selectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setAppliedSuggestionIds([]);
    // Set default initial completed roadmap steps for this profile
    const profile = CANDIDATE_PROFILES.find((p) => p.id === profileId);
    if (profile) {
      const initialDone = profile.roadmapMilestones
        .filter((m) => m.status === "completed")
        .map((m) => m.id);
      setCompletedRoadmapIds(initialDone.length > 0 ? initialDone : [1]);
    }
  };

  const selectJob = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const selectInterviewCategory = (category: string) => {
    setActiveInterviewCategory(category);
    const questions = INTERVIEW_QUESTIONS.filter((q) => q.category === category);
    if (questions.length > 0) {
      setActiveQuestionId(questions[0].id);
    }
  };

  const selectQuestion = (questionId: string) => {
    setActiveQuestionId(questionId);
  };

  const toggleSuggestion = (suggestionId: string) => {
    setAppliedSuggestionIds((prev) =>
      prev.includes(suggestionId) ? prev.filter((id) => id !== suggestionId) : [...prev, suggestionId]
    );
  };

  const toggleRoadmapMilestone = (milestoneId: number) => {
    setCompletedRoadmapIds((prev) =>
      prev.includes(milestoneId) ? prev.filter((id) => id !== milestoneId) : [...prev, milestoneId]
    );
  };

  const completeAllMilestones = () => {
    const allIds = activeProfile.roadmapMilestones.map((m) => m.id);
    setCompletedRoadmapIds(allIds);
  };

  const resetRoadmapMilestones = () => {
    setCompletedRoadmapIds([]);
  };

  const resetToDefaults = () => {
    setSelectedProfileId("alex-chen");
    setSelectedJobId("job-stripe");
    setActiveInterviewCategory("frontend");
    setActiveQuestionId("fe-1");
    setAppliedSuggestionIds([]);
    setCompletedRoadmapIds([1, 2]);
  };

  return (
    <CareerContext.Provider
      value={{
        selectedProfileId,
        selectedJobId,
        activeInterviewCategory,
        activeQuestionId,
        appliedSuggestionIds,
        completedRoadmapIds,
        activeProfile,
        activeJob,
        activeQuestion,
        categoryQuestions,
        computedResumeScore,
        computedAtsScore,
        computedKeywordMatch,
        appliedScoreBoost,
        roadmapProgressPercent,
        selectProfile,
        selectJob,
        selectInterviewCategory,
        selectQuestion,
        toggleSuggestion,
        toggleRoadmapMilestone,
        completeAllMilestones,
        resetRoadmapMilestones,
        resetToDefaults,
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
