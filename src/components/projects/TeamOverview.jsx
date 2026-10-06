"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Edit3,
  Plus,
  Share2,
  UserRound,
} from "lucide-react";

import ProjectCard from "./ProjectCard";

import {
  InvitePeopleModal,
  ProjectModal,
  ConfirmModal,
} from "./ProjectModals";

import {
  createId,
  getCurrentUser,
  getTeamById,
  getTeamProjects,
  getInitials,
  getProjectData,
  saveProjectData,
} from "@/src/lib/project-data";

export default function TeamOverview({
  teamId,
}) {
  const [data, setData] = useState(null);

  const [inviteOpen, setInviteOpen] =
    useState(false);

  const [projectOpen, setProjectOpen] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  const [deleteProject, setDeleteProject] =
    useState(null);

  const [editingDescription, setEditingDescription] =
    useState(false);

  const [descriptionDraft, setDescriptionDraft] =
    useState("");

  const [copied, setCopied] = useState(false);

  const [toast, setToast] = useState("");

  function loadData() {
    const nextData = getProjectData();

    setData(nextData);
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

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(
      () => setToast(""),
      2500
    );

    return () => clearTimeout(timer);
  }, [toast]);

  const team = useMemo(() => {
    return getTeamById(data, teamId);
  }, [data, teamId]);

  const projects = useMemo(() => {
    return getTeamProjects(data, teamId);
  }, [data, teamId]);

  const currentUser = getCurrentUser(data);

  function notify(message) {
    setToast(message);
  }

  function startDescriptionEdit() {
    setDescriptionDraft(team?.description || "");
    setEditingDescription(true);
  }

  function cancelDescriptionEdit() {
    setDescriptionDraft(team?.description || "");
    setEditingDescription(false);
  }

  function saveDescription() {
    if (!data || !team) return;

    const updatedData = {
      ...data,

      teams: data.teams.map((item) =>
        item.id === team.id
          ? {
              ...item,
              description:
                descriptionDraft.trim(),
            }
          : item
      ),
    };

    saveProjectData(updatedData);
    setData(updatedData);
    setEditingDescription(false);

    notify("Description updated.");
  }

  function saveProject(values) {
    if (!data) return;

    const now = new Date().toISOString();

    let updatedData;

    if (values.id) {
      updatedData = {
        ...data,

        projects: data.projects.map(
          (project) =>
            project.id === values.id
              ? {
                  ...project,
                  name: values.name,
                  description:
                    values.description,
                  teamId: values.teamId,
                  color: values.color,
                  updatedAt: now,
                }
              : project
        ),
      };
    } else {
      const newProject = {
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

      updatedData = {
        ...data,

        projects: [
          ...data.projects,
          newProject,
        ],
      };
    }

    saveProjectData(updatedData);
    setData(updatedData);

    setProjectOpen(false);
    setEditingProject(null);

    notify(
      values.id
        ? "Project updated."
        : "Project created."
    );
  }

  function removeProject() {
    if (!data || !deleteProject) return;

    const updatedData = {
      ...data,

      projects: data.projects.filter(
        (project) =>
          project.id !== deleteProject.id
      ),
    };

    saveProjectData(updatedData);
    setData(updatedData);
    setDeleteProject(null);

    notify("Project deleted.");
  }

  function toggleFavorite(project) {
    if (!data) return;

    const updatedData = {
      ...data,

      projects: data.projects.map(
        (item) =>
          item.id === project.id
            ? {
                ...item,
                favorite: !item.favorite,
              }
            : item
      ),
    };

    saveProjectData(updatedData);
    setData(updatedData);
  }

  function inviteMember(values) {
    if (!data || !team) return;

    const invitation = {
      id: createId("invite"),
      teamId: team.id,
      email: values.email,
      projectIds:
        values.projectIds || [],
      status: "pending",
      createdAt:
        new Date().toISOString(),
    };

    const updatedData = {
      ...data,

      invitations: [
        ...(data.invitations || []),
        invitation,
      ],
    };

    saveProjectData(updatedData);
    setData(updatedData);
    setInviteOpen(false);

    notify("Invitation saved.");
  }

  async function shareTeam() {
    const url = `${window.location.origin}/projects/team/${team.id}`;

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);
      notify("Team link copied.");

      setTimeout(
        () => setCopied(false),
        2000
      );
    } catch {
      notify("Could not copy link.");
    }
  }

  if (!data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-sm text-slate-500">
          Loading project...
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="p-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Team not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This team does not exist anymore.
          </p>
        </div>
      </div>
    );
  }

  const members = team.members || [];

  return (
    <div className="relative min-h-full bg-slate-50/60">
      {toast && (
        <div className="fixed right-6 top-20 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          {toast}
        </div>
      )}

      <div className="mx-auto w-full max-w-[1500px] px-6 py-7 lg:px-8">
        {/* Header */}

        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={17} />
            </Link>

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                  {getInitials(team.name)}
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {team.name}
                  </h1>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Team overview
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={shareTeam}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            {copied ? (
              <Check size={16} />
            ) : (
              <Share2 size={16} />
            )}

            {copied ? "Copied" : "Share"}
          </button>
        </div>

        {/* Main */}

        <div className="mt-7 grid gap-6 xl:grid-cols-[290px_minmax(0,1fr)]">
          {/* Left */}

          <div className="space-y-5">
            {/* Description */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Description
                </h2>

                {!editingDescription && (
                  <button
                    type="button"
                    onClick={startDescriptionEdit}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Edit3 size={15} />
                  </button>
                )}
              </div>

              {editingDescription ? (
                <div className="mt-4">
                  <textarea
                    value={descriptionDraft}
                    onChange={(event) =>
                      setDescriptionDraft(
                        event.target.value
                      )
                    }
                    rows={5}
                    autoFocus
                    placeholder="Write team description..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />

                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={
                        cancelDescriptionEdit
                      }
                      className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={saveDescription}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {team.description ||
                    "Add Description"}
                </p>
              )}
            </section>

            {/* Members */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Members
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {members.length} member
                    {members.length !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>

                <UserRound
                  size={17}
                  className="text-slate-400"
                />
              </div>

              <div className="mt-5 space-y-3">
                {members.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No members in this team.
                  </p>
                ) : (
                  members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        {getInitials(
                          member.name
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {member.name}
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {member.email ||
                            member.role ||
                            "Member"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Right */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Projects
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Projects inside {team.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setProjectOpen(true);
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Plus size={16} />
                New Project
              </button>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              {projects.length === 0 ? (
                <div className="w-full rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Plus size={19} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-800">
                    No projects yet
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Create your first project.
                  </p>
                </div>
              ) : (
                projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={(item) => {
                      setEditingProject(item);
                      setProjectOpen(true);
                    }}
                    onDelete={(item) =>
                      setDeleteProject(item)
                    }
                    onFavorite={toggleFavorite}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <InvitePeopleModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        team={team}
        projects={projects}
        onInvite={inviteMember}
      />

      <ProjectModal
        open={projectOpen}
        onClose={() => {
          setProjectOpen(false);
          setEditingProject(null);
        }}
        onSave={saveProject}
        project={editingProject}
        teams={data.teams}
        defaultTeamId={team.id}
      />

      <ConfirmModal
        open={Boolean(deleteProject)}
        onClose={() => setDeleteProject(null)}
        onConfirm={removeProject}
        title="Delete project?"
        description={`"${deleteProject?.name || ""}" will be removed from this project list.`}
        confirmText="Delete"
      />
    </div>
  );
}