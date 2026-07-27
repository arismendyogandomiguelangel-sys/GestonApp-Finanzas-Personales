"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type EconomicActivity =
  | "employee"
  | "student"
  | "entrepreneur"
  | "freelancer"
  | "online_seller"
  | "independent_pro"
  | "dependent";

export type LifeSituation =
  | "single"
  | "family"
  | "parent"
  | "single_parent"
  | "couple_no_kids"
  | "renting"
  | "mortgage"
  | "financed_car";

export type AssistanceMode = "objective" | "eventual";

export type AgentGender = "masculine" | "feminine" | "neutral";

export interface UserProfile {
  userName: string;
  activities: EconomicActivity[];
  lifeSituations: LifeSituation[];
  assistanceMode: AssistanceMode;
  agentName: string;
  agentGender: AgentGender;
  showAliasPrefix: boolean;
  aiModuleEnabled: boolean;
  onboardingCompleted: boolean;
  onboardingRoute?: "quick" | "guided";
}

const DEFAULT_PROFILE: UserProfile = {
  userName: "",
  activities: ["employee"],
  lifeSituations: ["single"],
  assistanceMode: "objective",
  agentName: "Axel",
  agentGender: "masculine",
  showAliasPrefix: true,
  aiModuleEnabled: true,
  onboardingCompleted: false,
};

const PROFILE_STORAGE_KEY = "gfp_user_profile";

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>, route: "quick" | "guided") => void;
  toggleAiModule: (enabled: boolean) => void;
  hasBusinessFeatures: boolean;
  getAgentDisplayName: () => string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Use defaults if storage unavailable
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const completeOnboarding = (data: Partial<UserProfile>, route: "quick" | "guided") => {
    updateProfile({
      ...data,
      onboardingCompleted: true,
      onboardingRoute: route,
    });
  };

  const toggleAiModule = (enabled: boolean) => {
    updateProfile({ aiModuleEnabled: enabled });
  };

  const hasBusinessFeatures = profile.activities.some((act) =>
    act === "entrepreneur" || act === "independent_pro"
  );

  const getAgentDisplayName = (): string => {
    const name = profile.agentName || "ALIAS";
    if (profile.showAliasPrefix) {
      return name.startsWith("ALIAS") ? name : `ALIAS ${name}`;
    }
    return name;
  };

  if (!isLoaded) {
    return null; // Avoid hydration mismatch before reading localStorage
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        completeOnboarding,
        toggleAiModule,
        hasBusinessFeatures,
        getAgentDisplayName,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
