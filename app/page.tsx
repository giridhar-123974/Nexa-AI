import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { FeaturesGrid } from "@/components/features/FeaturesGrid";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { WhyChoose } from "@/components/why-nexa/WhyChoose";
import { Pricing } from "@/components/pricing/Pricing";
import { Faq } from "@/components/faq/Faq";
import { FinalCta } from "@/components/cta/FinalCta";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative selection:bg-brand-500/30 selection:text-white">
      {/* 1. Sticky Navigation Header */}
      <Navbar />

      {/* Main Page Landmark */}
      <main id="main-content" className="flex-1">
        {/* 2. Hero Section with 3D Tilt Mockup */}
        <Hero />

        {/* 3. Interactive Live SaaS Dashboard Product Showcase */}
        <DashboardPreview />

        {/* 4. Six Premium Feature Engines */}
        <FeaturesGrid />

        {/* 5. Four-Stage How It Works Workflow */}
        <HowItWorks />

        {/* 6. Why Choose Nexa AI Value Pillars */}
        <WhyChoose />

        {/* 7. Honest Tiered Pricing */}
        <Pricing />

        {/* 8. Comprehensive Accessible FAQ */}
        <Faq />

        {/* 9. Final Demonstration CTA */}
        <FinalCta />
      </main>

      {/* 10. Multi-Column Accessible Footer */}
      <Footer />
    </div>
  );
}
