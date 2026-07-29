"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { fetchWithCsrf } from "@/lib/csrf";

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
  voiceEnabled: boolean;
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
  voiceEnabled: false,
  onboardingCompleted: false,
};

const PROFILE_STORAGE_KEY = "gfp_user_profile";

// userName has no server column (workspace_settings has no per-user display
// name) — it stays localStorage-only. Everything else is persisted server-side
// via /api/workspace-settings; localStorage is only an optimistic cache so the
// UI doesn't flash defaults before the server round-trip resolves.
type ServerProfileFields = Readonly<{
  economicActivities: ReadonlyArray<string>;
  lifeSituation: ReadonlyArray<string>;
  assistanceMode: string;
  agentName: string;
  agentGender: string;
  agentShowPrefix: boolean;
  aiModuleEnabled: boolean;
  voiceEnabled: boolean;
  onboardingCompleted: boolean;
  onboardingRoute: string | null;
}>;

const fromServerFields = (server: Partial<ServerProfileFields>): Partial<UserProfile> => {
  const updates: Partial<UserProfile> = {};
  if (server.economicActivities !== undefined) updates.activities = server.economicActivities as EconomicActivity[];
  if (server.lifeSituation !== undefined) updates.lifeSituations = server.lifeSituation as LifeSituation[];
  if (server.assistanceMode !== undefined) updates.assistanceMode = server.assistanceMode as AssistanceMode;
  if (server.agentName !== undefined) updates.agentName = server.agentName;
  if (server.agentGender !== undefined) updates.agentGender = server.agentGender as AgentGender;
  if (server.agentShowPrefix !== undefined) updates.showAliasPrefix = server.agentShowPrefix;
  if (server.aiModuleEnabled !== undefined) updates.aiModuleEnabled = server.aiModuleEnabled;
  if (server.voiceEnabled !== undefined) updates.voiceEnabled = server.voiceEnabled;
  if (server.onboardingCompleted !== undefined) updates.onboardingCompleted = server.onboardingCompleted;
  if (server.onboardingRoute !== undefined && server.onboardingRoute !== null) {
    updates.onboardingRoute = server.onboardingRoute as "quick" | "guided";
  }
  return updates;
};

const toServerFields = (updates: Partial<UserProfile>): Record<string, unknown> => {
  const server: Record<string, unknown> = {};
  if (updates.activities !== undefined) server.economicActivities = updates.activities;
  if (updates.lifeSituations !== undefined) server.lifeSituation = updates.lifeSituations;
  if (updates.assistanceMode !== undefined) server.assistanceMode = updates.assistanceMode;
  if (updates.agentName !== undefined) server.agentName = updates.agentName;
  if (updates.agentGender !== undefined) server.agentGender = updates.agentGender;
  if (updates.showAliasPrefix !== undefined) server.agentShowPrefix = updates.showAliasPrefix;
  if (updates.aiModuleEnabled !== undefined) server.aiModuleEnabled = updates.aiModuleEnabled;
  if (updates.voiceEnabled !== undefined) server.voiceEnabled = updates.voiceEnabled;
  if (updates.onboardingCompleted !== undefined) server.onboardingCompleted = updates.onboardingCompleted;
  if (updates.onboardingRoute !== undefined) server.onboardingRoute = updates.onboardingRoute;
  return server;
};

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>, route: "quick" | "guided") => Promise<void>;
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

    // Server is the source of truth once it responds; reconcile over the
    // localStorage cache (which only exists to avoid a blank first paint).
    fetch("/api/workspace-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Partial<ServerProfileFields> | null) => {
        if (data === null) return;
        const updates = fromServerFields(data);
        if (Object.keys(updates).length === 0) return;
        setProfile((prev) => {
          const next = { ...prev, ...updates };
          try {
            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
          } catch {
            // Ignore storage errors
          }
          return next;
        });
      })
      .catch(() => {
        // Offline/unauthenticated — keep the localStorage cache (or defaults)
      });
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

    const serverFields = toServerFields(updates);
    if (Object.keys(serverFields).length === 0) return;
    fetchWithCsrf("/api/workspace-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverFields),
    }).catch(() => {
      // Optimistic update already applied locally; server retries on next change
    });
  };

  const completeOnboarding = async (data: Partial<UserProfile>, route: "quick" | "guided"): Promise<void> => {
    const updates: Partial<UserProfile> = {
      ...data,
      onboardingCompleted: true,
      onboardingRoute: route,
    };
    const serverFields = toServerFields(updates);
    const response = await fetchWithCsrf("/api/workspace-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverFields),
    });
    if (!response.ok) {
      throw new Error("Unable to save onboarding progress");
    }

    setProfile((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors; the server state has already been saved.
      }
      return next;
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
