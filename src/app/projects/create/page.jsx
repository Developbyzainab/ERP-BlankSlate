"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
} from "lucide-react";

import {
  ProjectModal,
} from "@/src/components/projects/ProjectModals";

import {
  createId,
  getProjectData,
  saveProjectData,
} from "@/src/lib/project-data";

export default function CreateProjectPage() {
  const router = useRouter();

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getProjectData());
  }, []);

  function saveProject(values) {
    if (!data) return;

    const now = new Date().toISOString();

    const project = {
      id: createId("project"),
      teamId: values.teamId,
      name: values.name,
      description:
        values.description || "",
      color: values.color || "violet",
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };

    const updatedData = {
      ...data,

      projects: [
        ...data.projects,
        project,
      ],
    };

    saveProjectData(updatedData);

    router.push(
      `/projects/project/${project.id}`
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50/60">
      <div className="mx-auto w-full max-w-[900px] px-6 py-7 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Create Project
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Create a new project and assign it
            to a team.
          </p>

          <div className="mt-7">
            <ProjectModal
              open={true}
              onClose={() =>
                router.push("/projects")
              }
              onSave={saveProject}
              teams={data.teams}
              defaultTeamId={
                data.teams[0]?.id || ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}