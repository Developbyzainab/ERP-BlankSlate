"use client";

import { useParams } from "next/navigation";

import ProjectWorkspace from "@/src/components/projects/ProjectWorkspace";

export default function ProjectPageClient() {
  const params = useParams();

  return (
    <ProjectWorkspace
      projectId={params.projectId}
    />
  );
}