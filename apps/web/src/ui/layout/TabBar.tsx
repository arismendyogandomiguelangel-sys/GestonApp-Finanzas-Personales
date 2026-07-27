"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { NAVIGATION_STRUCTURE } from "@/lib/navigation";
import styles from "./TabBar.module.css";

export function TabBar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  // Find current active module
  const currentModule = NAVIGATION_STRUCTURE.find((item) =>
    item.baseHref === "/"
      ? pathname === "/" || pathname === "/actividad"
      : pathname.startsWith(item.baseHref)
  );

  if (!currentModule || currentModule.tabs.length <= 1) {
    return null;
  }

  return (
    <div className={styles.tabBarContainer}>
      {currentModule.tabs.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname === tab.href;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ""}`}
          >
            {t(tab.labelKey)}
          </Link>
        );
      })}
    </div>
  );
}
