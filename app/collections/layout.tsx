import type {
    ReactNode,
  } from "react";
  
  import { SiteEffects } from "@/components/SiteEffects";
  
  import { DashboardDataProvider } from "@/components/dashboard/DashboardDataProvider";
  
  import { UserDashboardShell } from "@/components/dashboard/UserDashboardShell";
  
  import "@/styles/user-dashboard.css";
  
  
  export default function CollectionsLayout({
    children,
  }: {
    children: ReactNode;
  }) {
    return (
      <>
        <SiteEffects />
  
        <DashboardDataProvider>
          <UserDashboardShell>
            {children}
          </UserDashboardShell>
        </DashboardDataProvider>
      </>
    );
  }