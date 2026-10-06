"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Edit3,
  FolderKanban,
  Share2,
  Star,
  Trash2,
  Users,
} from "lucide-react";

import {
  getProjectData,
  saveProjectData,
} from "@/src/lib/project-data";

import {
  ProjectModal,
  ConfirmModal,
} from "./ProjectModals";

export default function ProjectDetail({ projectId }) {
  const [data, setData] = useState(null);
  const [project, setProject] = useState(null);
  const [team, setTeam] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const nextData = getProjectData();

      setData(nextData);

      const foundProject = nextData.projects.find(
        (item) => item.id === projectId
      );

      setProject(foundProject || null);

      if (foundProject) {
        const foundTeam = nextData.teams.find(
          (item) => item.id === foundProject.teamId
        );

        setTeam(foundTeam || null);
      }
    };

    loadData();

    window.addEventListener("project-data-updated", loadData);

    return () => {
      window.removeEventListener("project-data-updated", loadData);
    };
  }, [projectId]);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-slate-500">
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <FolderKanban size={22} className="text-slate-500" />
          </div>

          <h1 className="text-xl font-semibold text-slate-900">
            Project Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This project may have been deleted or the URL is incorrect.
          </p>

          <Link
            href="/projects"
            className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Go to Projects
          </Link>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    const nextData = getProjectData();

    const updatedProjects = nextData.projects.map((item) =>
      item.id === project.id
        ? {
            ...item,
            favorite: !item.favorite,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    const updatedData = {
      ...nextData,
      projects: updatedProjects,
    };

    saveProjectData(updatedData);

    setData(updatedData);
    setProject(
      updatedProjects.find((item) => item.id === project.id)
    );
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleUpdateProject = (values) => {
    const nextData = getProjectData();

    const updatedProjects = nextData.projects.map((item) =>
      item.id === project.id
        ? {
            ...item,
            name: values.name.trim(),
            description: values.description || "",
            teamId: values.teamId,
            color: values.color || "indigo",
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    const updatedData = {
      ...nextData,
      projects: updatedProjects,
    };

    saveProjectData(updatedData);

    setData(updatedData);

    const updatedProject = updatedProjects.find(
      (item) => item.id === project.id
    );

    setProject(updatedProject);

    const updatedTeam = updatedData.teams.find(
      (item) => item.id === updatedProject.teamId
    );

    setTeam(updatedTeam || null);

    setEditOpen(false);
  };

  const handleDeleteProject = () => {
    const nextData = getProjectData();

    const updatedData = {
      ...nextData,
      projects: nextData.projects.filter(
        (item) => item.id !== project.id
      ),
    };

    saveProjectData(updatedData);

    window.location.href = "/projects";
  };

  return (
    <>
      <div className="mx-auto w-full max-w-6xl">
        {/* Top navigation */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href={
              team
                ? `/projects/team/${team.id}`
                : "/projects"
            }
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copied
                </>
              ) : (
                <>
                  <Share2 size={15} />
                  Share
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Edit3 size={15} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </div>

        {/* Project header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <FolderKanban
                  size={25}
                  className="text-slate-700"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {project.name}
                  </h1>

                  <button
                    type="button"
                    onClick={toggleFavorite}
                    className="rounded-md p-1.5 transition hover:bg-slate-100"
                    title={
                      project.favorite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  >
                    <Star
                      size={18}
                      className={
                        project.favorite
                          ? "fill-current text-amber-500"
                          : "text-slate-400"
                      }
                    />
                  </button>
                </div>

                {team && (
                  <Link
                    href={`/projects/team/${team.id}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
                  >
                    <Users size={14} />
                    {team.name}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Description
            </h2>

            {project.description ? (
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {project.description}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-400">
                No description added yet.
              </p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-slate-500" />

              <h2 className="font-semibold text-slate-900">
                Team
              </h2>
            </div>

            <div className="mt-4">
              {team ? (
                <Link
                  href={`/projects/team/${team.id}`}
                  className="text-sm font-medium text-slate-800 hover:underline"
                >
                  {team.name}
                </Link>
              ) : (
                <span className="text-sm text-slate-400">
                  No team
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={18}
                className="text-slate-500"
              />

              <h2 className="font-semibold text-slate-900">
                Project Information
              </h2>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Created
                </span>

                <span className="text-slate-700">
                  {project.createdAt
                    ? new Date(
                        project.createdAt
                      ).toLocaleDateString()
                    : "—"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Status
                </span>

                <span className="font-medium text-slate-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdateProject}
        teams={data.teams}
        initialData={project}
        title="Edit Project"
      />

      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteProject}
        title="Delete Project?"
        description={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
        confirmText="Delete Project"
      />
    </>
  );
}