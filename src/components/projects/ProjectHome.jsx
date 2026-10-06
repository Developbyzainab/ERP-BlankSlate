"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  ArrowRight,
  Plus,
} from "lucide-react";

import ProjectCard from "./ProjectCard";

import {
  getProjectData,
  getTeamProjects,
} from "@/src/lib/project-data";

export default function ProjectsHome() {
  const [data, setData] = useState(null);

  function loadData() {
    setData(getProjectData());
  }

  useEffect(() => {
    loadData();

    window.addEventListener(
      "project-data-updated",
      loadData
    );

    return () => {
      window.removeEventListener(
        "project-data-updated",
        loadData
      );
    };
  }, []);

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
      <div className="mx-auto w-full max-w-[1500px] px-6 py-7 lg:px-8">
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <FolderKanban size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Projects
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Manage your teams and projects.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Teams
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Select a team to open its overview.
              </p>
            </div>

            <Link
              href="/projects/create"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus size={16} />
              New Project
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.teams.map((team) => {
              const teamProjects =
                getTeamProjects(
                  data,
                  team.id
                );

              return (
                <Link
                  key={team.id}
                  href={`/projects/team/${team.id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
                      {team.name
                        .split(" ")
                        .slice(0, 2)
                        .map(
                          (word) =>
                            word[0]
                        )
                        .join("")
                        .toUpperCase()}
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-slate-300"
                    />
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-slate-900">
                    {team.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {teamProjects.length} project
                    {teamProjects.length !== 1
                      ? "s"
                      : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              All Projects
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              All projects from your teams.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {data.projects.length === 0 ? (
              <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
                <p className="text-sm text-slate-400">
                  No projects yet.
                </p>
              </div>
            ) : (
              data.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}