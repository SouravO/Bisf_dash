"use client";

import React, { useState } from "react";
import LandingPage from "@/components/LandingPage";
import JourneyForm from "@/components/JourneyForm";

export default function App() {
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);

  // If the journey is started, show the Multi-step Form component
  if (isJourneyStarted) {
    return <JourneyForm onBackToHome={() => setIsJourneyStarted(false)} />;
  }

  // Default: Show the Landing Page
  return <LandingPage onStartJourney={() => setIsJourneyStarted(true)} />;
}
