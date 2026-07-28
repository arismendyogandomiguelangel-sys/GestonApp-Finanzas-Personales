import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, unstable_rethrow } from "next/navigation";

import { readChatCookies } from "@/lib/chatCookies";
import { isDemoMode } from "@/lib/demoMode";
import { DEFAULT_USER_SETTINGS, RTL_LOCALES, type SupportedLocale } from "@/lib/locale";
import { getLocaleCookie } from "@/lib/localeCookie";
import { NAV_LINKS } from "@/lib/navigation";
import { I18nProvider } from "@/i18n/I18nProvider";
import { t } from "@/i18n/serverT";
import { buildRequestIdentity } from "@/server/db/requestIdentity";
import { listWorkspaces, type WorkspaceSummary } from "@/server/workspaces";
import { getReportCurrency } from "@/server/reportCurrency";
import { getUserSettings } from "@/server/userSettings";
import { extractUserIdFromHeaders, extractWorkspaceIdFromHeaders } from "@/server/userId";
import { resolveWorkspaceForCurrentRequestIdentity } from "@/server/workspaceBootstrap";
import { AccountMenu } from "@/ui/AccountMenu";
import { ChatLayoutProvider, ChatLayoutShell } from "@/ui/chat";
import type { ChatDraftScope } from "@/ui/chat/shell/layout/chatDraftStorage";
import { CurrencySelector } from "@/ui/CurrencySelector";
import { FilteredBanner } from "@/ui/FilteredBanner";
import { FilteredModeProvider } from "@/ui/FilteredModeProvider";
import { FormatProvider } from "@/ui/FormatProvider";
import { ModeToggle } from "@/ui/ModeToggle";
import { ProfileProvider } from "@/ui/profile/profileContext";
import { Sidebar } from "@/ui/layout/Sidebar";
import { TabBar } from "@/ui/layout/TabBar";
import { OnboardingModal } from "@/ui/onboarding/OnboardingModal";

import "./globals.css";

export const metadata: Metadata = {
  title: "GestionIHA - Finanzas Personales",
  description: "Asistente financiero personal agéntico con ALIAS",
};

import { FloatingAgentBar } from "@/ui/agent/FloatingAgentBar";
import { LearningBanner } from "@/ui/agent/LearningBanner";

export default async function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;
  const headersList = await headers();
  const requestPath = headersList.get("x-request-path") ?? "";
  // Pages reachable without a session: they carry no identity headers, so the
  // authenticated chrome below (which reads x-user-id) must be skipped.
  const isUnauthenticatedPage = requestPath.startsWith("/share/monthly/")
    || requestPath === "/login"
    || requestPath.startsWith("/login?");

  if (isUnauthenticatedPage) {
    const publicLocale = await getLocaleCookie();

    return (
      <html lang={publicLocale} dir={RTL_LOCALES.has(publicLocale) ? "rtl" : "ltr"}>
        <body>
          <I18nProvider locale={publicLocale}>
            {children}
          </I18nProvider>
        </body>
      </html>
    );
  }

  const demo = await isDemoMode();
  const { chatOpen, chatWidth } = await readChatCookies();
  const currentUserId = extractUserIdFromHeaders(headersList);

  const authMode = process.env.AUTH_MODE;
  const authEnabled = authMode === "cognito" || authMode === "insforge";
  let reportingCurrency = "USD";
  let workspaces: ReadonlyArray<WorkspaceSummary> = [];
  let currentWorkspaceId = "";
  let locale: SupportedLocale = "en";
  let numberFormat = DEFAULT_USER_SETTINGS.numberFormat;
  let dateFormat = DEFAULT_USER_SETTINGS.dateFormat;

  if (demo) {
    locale = await getLocaleCookie();
  } else {
    try {
      const workspaceId = extractWorkspaceIdFromHeaders(headersList);
      currentWorkspaceId = workspaceId;
      if (authEnabled) {
        const resolvedWorkspace = await resolveWorkspaceForCurrentRequestIdentity(
          buildRequestIdentity(headersList),
          workspaceId,
        );
        if (resolvedWorkspace.workspaceId !== workspaceId) {
          const returnTo = headersList.get("x-request-path") ?? "/";
          redirect(`/api/workspaces/bootstrap?returnTo=${encodeURIComponent(returnTo)}`);
        }
      }
      reportingCurrency = await getReportCurrency(currentUserId, workspaceId);
      if (authEnabled) {
        workspaces = await listWorkspaces(currentUserId, workspaceId);
      }
      const initialLocale = await getLocaleCookie();
      const userSettings = await getUserSettings(currentUserId, workspaceId, initialLocale);
      locale = userSettings.locale;
      numberFormat = userSettings.numberFormat;
      dateFormat = userSettings.dateFormat;
    } catch (err) {
      if (err && typeof err === "object" && "digest" in err && String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")) {
        throw err;
      }
      locale = await getLocaleCookie();
    }
  }

  const chatDraftScope: ChatDraftScope = demo
    ? { mode: "demo", userId: currentUserId }
    : { mode: "workspace", userId: currentUserId, workspaceId: currentWorkspaceId };

  return (
    <html lang={locale} dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"}>
      <body>
        <I18nProvider locale={locale}>
          <FormatProvider numberFormat={numberFormat} dateFormat={dateFormat}>
            <FilteredModeProvider isDemoMode={demo}>
              <ProfileProvider>
                <div className="app-layout">
                  <Sidebar />
                  <div className="main-content">
                    <div className="header-sticky">
                      {demo && (
                        <div className="demo-banner">
                          {t(locale, "demo.banner")}<span className="demo-banner-detail"> {t(locale, "demo.bannerDetail")}</span>
                        </div>
                      )}
                      <FilteredBanner />
                      <header className="topbar">
                        <TabBar />
                        <div className="topbar-actions">
                          <CurrencySelector initialCurrency={reportingCurrency} titleText={t(locale, "currency.title")} />
                          <ModeToggle isDemoMode={demo} />
                          <AccountMenu
                            authEnabled={authEnabled}
                            workspaces={workspaces}
                            currentWorkspaceId={currentWorkspaceId}
                          />
                        </div>
                      </header>
                    </div>
                    <ChatLayoutProvider
                      initialChatOpen={chatOpen}
                      initialChatWidth={chatWidth}
                      draftScope={chatDraftScope}
                    >
                      <ChatLayoutShell workspaceId={currentWorkspaceId}>
                        <div style={{ padding: "16px" }}>
                          <LearningBanner />
                          {children}
                        </div>
                      </ChatLayoutShell>
                    </ChatLayoutProvider>
                  </div>
                </div>
                <FloatingAgentBar />
                <OnboardingModal />
              </ProfileProvider>
            </FilteredModeProvider>
          </FormatProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

