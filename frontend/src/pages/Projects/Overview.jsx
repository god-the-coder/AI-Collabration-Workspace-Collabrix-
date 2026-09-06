

import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import ProjectPulse from "./components/ProjectPulse";
import TaskProgress from "./components/TaskProgress";
import RecentActivity from "./components/RecentActivity";
import AIProjectSummary from "./components/AIProjectSummary";

import { projectOverview } from "../../api/project.api";




export default function Overview() {
  const { project } = useOutletContext();

  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectOverview = async () => {
      if (!project?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await projectOverview(project.id);

        console.log("PROJECT OVERVIEW:", response.data);

        setOverviewData(response.data);
      } catch (err) {
        console.error("Project overview fetch error:", err);

        setError(
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to load project overview."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectOverview();
  }, [project?.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        Loading project overview...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <p className="text-sm text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ProjectPulse summary={overviewData?.summary} />

      <TaskProgress progress={overviewData?.task_progress} />

      <RecentActivity />

      <AIProjectSummary />
    </div>
  );
}