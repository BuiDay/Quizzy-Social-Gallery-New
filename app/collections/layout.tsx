import type {
  ReactNode,
} from "react";

import { SiteEffects } from "@/components/SiteEffects";

import { DashboardDataProvider } from "@/components/dashboard/DashboardDataProvider";

import { UserDashboardShell } from "@/components/dashboard/UserDashboardShell";

import "@/styles/user-dashboard.css";
import ElearningLesson9Popup from "@/components/lesson9-popups/ElearningLesson9Popup";


export default function CollectionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SiteEffects />
      <ElearningLesson9Popup
        href="collections/courses"
      />
      <DashboardDataProvider>
        <UserDashboardShell>
          {children}
        </UserDashboardShell>
      </DashboardDataProvider>
    </>
  );
}