import React from 'react';

import QuickActions from './components/QuickActions';
import ProjectPulse from './components/ProjectPulse';
import TaskProgress from './components/TaskProgress';
import RecentActivity from './components/RecentActivity';
import AIProjectSummary from './components/AIProjectSummary';

/* ======================================================================
   pages/Projects/Overview.jsx
   Rendered inside <DashboardLayout><ProjectLayout> as the "Overview" tab.
   ProjectLayout already renders the Project Header (name, workspace,
   status, priority, progress) and Project Tabs — do NOT recreate or
   import them. This file composes only the Overview tab's content.

   Purpose: "How is this project progressing?" — nothing else.
   UI only — no routing, no API calls, no business logic.
====================================================================== */

export default function Overview() {
  return (
    <div className="flex flex-col gap-8">
      {/* <QuickActions /> */}
      <ProjectPulse />
      <TaskProgress />
      <RecentActivity />
      <AIProjectSummary />
    </div>
  );
}
