"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AgentGender,
  AssistanceMode,
  EconomicActivity,
  LifeSituation,
  useProfile,
} from "@/ui/profile/profileContext";
import styles from "./OnboardingModal.module.css";

const ECONOMIC_ACTIVITIES: { id: EconomicActivity; labelKey: string }[] = [
  { id: "employee", labelKey: "onboarding.act.employee" },
  { id: "student", labelKey: "onboarding.act.student" },
  { id: "entrepreneur", labelKey: "onboarding.act.entrepreneur" },
  { id: "freelancer", labelKey: "onboarding.act.freelancer" },
  { id: "online_seller", labelKey: "onboarding.act.online_seller" },
  { id: "independent_pro", labelKey: "onboarding.act.independent_pro" },
  { id: "dependent", labelKey: "onboarding.act.dependent" },
];

const LIFE_SITUATIONS: { id: LifeSituation; labelKey: string }[] = [
  { id: "single", labelKey: "onboarding.life.single" },
  { id: "family", labelKey: "onboarding.life.family" },
  { id: "parent", labelKey: "onboarding.life.parent" },
  { id: "single_parent", labelKey: "onboarding.life.single_parent" },
  { id: "couple_no_kids", labelKey: "onboarding.life.couple_no_kids" },
  { id: "renting", labelKey: "onboarding.life.renting" },
  { id: "mortgage", labelKey: "onboarding.life.mortgage" },
  { id: "financed_car", labelKey: "onboarding.life.financed_car" },
];

export function OnboardingModal() {
  const { profile, completeOnboarding } = useProfile();
  const { t } = useTranslation();

  const [mode, setMode] = useState<"initial" | "quick" | "guided">("initial");
  const [userName, setUserName] = useState(profile.userName);

  // Guided wizard state
  const [step, setStep] = useState(1);
  const [agentName, setAgentName] = useState("Axel");
  const [agentGender, setAgentGender] = useState<AgentGender>("masculine");
  const [showAliasPrefix, setShowAliasPrefix] = useState(true);
  const [selectedActivities, setSelectedActivities] = useState<EconomicActivity[]>(["employee"]);
  const [selectedSituations, setSelectedSituations] = useState<LifeSituation[]>(["single"]);
  const [assistanceMode, setAssistanceMode] = useState<AssistanceMode>("objective");

  if (profile.onboardingCompleted) {
    return null;
  }

  const handleQuickFinish = () => {
    completeOnboarding(
      {
        userName: userName.trim() || "Usuario",
        activities: ["employee"],
        assistanceMode: "eventual",
      },
      "quick"
    );
  };

  const handleGuidedFinish = () => {
    completeOnboarding(
      {
        userName: userName.trim() || "Usuario",
        agentName: agentName.trim() || "Axel",
        agentGender,
        showAliasPrefix,
        activities: selectedActivities,
        lifeSituations: selectedSituations,
        assistanceMode,
      },
      "guided"
    );
  };

  const toggleActivity = (act: EconomicActivity) => {
    setSelectedActivities((prev) =>
      prev.includes(act)
        ? prev.filter((a) => a !== act)
        : [...prev, act]
    );
  };

  const toggleSituation = (sit: LifeSituation) => {
    setSelectedSituations((prev) =>
      prev.includes(sit)
        ? prev.filter((s) => s !== sit)
        : [...prev, sit]
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {mode === "initial" && (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>{t("onboarding.welcomeTitle")}</h2>
              <p className={styles.subtitle}>{t("onboarding.welcomeSubtitle")}</p>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>{t("onboarding.yourName")}</label>
              <input
                type="text"
                className={styles.input}
                placeholder={t("onboarding.namePlaceholder")}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className={styles.pathGrid}>
              <div className={styles.card}>
                <div>
                  <div className={styles.cardIcon}>🚀</div>
                  <h3 className={styles.cardTitle}>{t("onboarding.quickTitle")}</h3>
                  <p className={styles.cardDesc}>{t("onboarding.quickDesc")}</p>
                </div>
                <button
                  className={styles.primaryBtn}
                  onClick={() => {
                    setMode("quick");
                    handleQuickFinish();
                  }}
                >
                  {t("onboarding.quickStartBtn")}
                </button>
              </div>

              <div className={styles.card}>
                <div>
                  <div className={styles.cardIcon}>⚙️</div>
                  <h3 className={styles.cardTitle}>{t("onboarding.guidedTitle")}</h3>
                  <p className={styles.cardDesc}>{t("onboarding.guidedDesc")}</p>
                </div>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setMode("guided")}
                >
                  {t("onboarding.guidedStartBtn")}
                </button>
              </div>
            </div>
          </>
        )}

        {mode === "guided" && (
          <div className={styles.wizardStep}>
            <div className={styles.stepProgress}>
              <div className={`${styles.stepDot} ${step >= 1 ? styles.stepDotActive : ""}`} />
              <div className={`${styles.stepDot} ${step >= 2 ? styles.stepDotActive : ""}`} />
              <div className={`${styles.stepDot} ${step >= 3 ? styles.stepDotActive : ""}`} />
              <div className={`${styles.stepDot} ${step >= 4 ? styles.stepDotActive : ""}`} />
            </div>

            {step === 1 && (
              <>
                <h3 className={styles.cardTitle}>{t("onboarding.step1.title")}</h3>
                <p className={styles.cardDesc}>{t("onboarding.step1.desc")}</p>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("onboarding.step1.agentNameLabel")}</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("onboarding.step1.genderLabel")}</label>
                  <select
                    className={styles.input}
                    value={agentGender}
                    onChange={(e) => setAgentGender(e.target.value as AgentGender)}
                  >
                    <option value="masculine">{t("onboarding.step1.genderMasculine")}</option>
                    <option value="feminine">{t("onboarding.step1.genderFeminine")}</option>
                    <option value="neutral">{t("onboarding.step1.genderNeutral")}</option>
                  </select>
                </div>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={showAliasPrefix}
                    onChange={(e) => setShowAliasPrefix(e.target.checked)}
                  />
                  <span>{t("onboarding.step1.showPrefix")}</span>
                </label>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className={styles.cardTitle}>{t("onboarding.step2.title")}</h3>
                <p className={styles.cardDesc}>{t("onboarding.step2.desc")}</p>
                <div className={styles.checkboxGrid}>
                  {ECONOMIC_ACTIVITIES.map((act) => {
                    const isSelected = selectedActivities.includes(act.id);
                    return (
                      <label
                        key={act.id}
                        className={`${styles.checkboxLabel} ${isSelected ? styles.checkboxLabelSelected : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleActivity(act.id)}
                        />
                        <span>{t(act.labelKey)}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className={styles.cardTitle}>{t("onboarding.step3.title")}</h3>
                <p className={styles.cardDesc}>{t("onboarding.step3.desc")}</p>
                <div className={styles.checkboxGrid}>
                  {LIFE_SITUATIONS.map((sit) => {
                    const isSelected = selectedSituations.includes(sit.id);
                    return (
                      <label
                        key={sit.id}
                        className={`${styles.checkboxLabel} ${isSelected ? styles.checkboxLabelSelected : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSituation(sit.id)}
                        />
                        <span>{t(sit.labelKey)}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className={styles.cardTitle}>{t("onboarding.step4.title")}</h3>
                <p className={styles.cardDesc}>{t("onboarding.step4.desc")}</p>

                <div className={styles.inputGroup}>
                  <label
                    className={`${styles.checkboxLabel} ${assistanceMode === "objective" ? styles.checkboxLabelSelected : ""}`}
                  >
                    <input
                      type="radio"
                      name="assistanceMode"
                      checked={assistanceMode === "objective"}
                      onChange={() => setAssistanceMode("objective")}
                    />
                    <div>
                      <strong>{t("onboarding.step4.modeObjectiveTitle")}</strong>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>
                        {t("onboarding.step4.modeObjectiveDesc")}
                      </p>
                    </div>
                  </label>

                  <label
                    className={`${styles.checkboxLabel} ${assistanceMode === "eventual" ? styles.checkboxLabelSelected : ""}`}
                  >
                    <input
                      type="radio"
                      name="assistanceMode"
                      checked={assistanceMode === "eventual"}
                      onChange={() => setAssistanceMode("eventual")}
                    />
                    <div>
                      <strong>{t("onboarding.step4.modeEventualTitle")}</strong>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>
                        {t("onboarding.step4.modeEventualDesc")}
                      </p>
                    </div>
                  </label>
                </div>
              </>
            )}

            <div className={styles.navRow}>
              {step > 1 ? (
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setStep(step - 1)}
                >
                  {t("common.back")}
                </button>
              ) : (
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setMode("initial")}
                >
                  {t("common.cancel")}
                </button>
              )}

              {step < 4 ? (
                <button
                  className={styles.primaryBtn}
                  onClick={() => setStep(step + 1)}
                >
                  {t("common.next")}
                </button>
              ) : (
                <button
                  className={styles.primaryBtn}
                  onClick={handleGuidedFinish}
                >
                  {t("onboarding.finish")}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
