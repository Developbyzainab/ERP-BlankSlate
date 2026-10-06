"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Search,
  X,
} from "lucide-react";

export default function InviteMemberModal({
  open,
  onClose,
  team,
  projects = [],
  onInvite,
}) {
  const [member, setMember] = useState("");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) {
      setMember("");
      setSelectedProject(null);
      setDropdownOpen(false);
      setSearch("");
    }
  }, [open]);

  const filteredProjects = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return projects;
    }

    return projects.filter((project) =>
      String(project.name || "")
        .toLowerCase()
        .includes(value)
    );
  }, [projects, search]);

  if (!open) {
    return null;
  }

  function handleSave(event) {
    event.preventDefault();

    if (!member.trim()) {
      return;
    }

    onInvite?.({
      email: member.trim(),
      projectIds: selectedProject
        ? [selectedProject.id]
        : [],
    });
  }

  function handleSelectProject(project) {
    setSelectedProject(project);
    setDropdownOpen(false);
    setSearch("");
  }

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]">

      {/* BACKDROP */}

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0"
      />

      {/* POPUP */}

      <div
        className="relative z-10 w-full max-w-[500px] overflow-visible rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-[18px] font-semibold text-slate-900">
              Invite Member in{" "}
              {team?.name || "Default Team"}
            </h2>

            <p className="mt-1 text-[13px] text-slate-400">
              Invite a member to this team.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={17} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSave}>

          <div className="space-y-5 px-6 py-6">

            {/* SELECT PROJECT */}

            <div>
              <label className="mb-2 block text-[13px] font-medium text-slate-700">
                Select Project
              </label>

              {/* MAIN SELECT FIELD */}

              <button
                type="button"
                onClick={() =>
                  setDropdownOpen(
                    (value) => !value
                  )
                }
                className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-left text-[13px] transition hover:border-slate-300 focus:border-slate-400"
              >
                <span
                  className={
                    selectedProject
                      ? "text-slate-800"
                      : "text-slate-300"
                  }
                >
                  {selectedProject
                    ? selectedProject.name
                    : "Select project"}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    dropdownOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* PROJECT DROPDOWN */}

              {dropdownOpen && (
                <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                  {/* SEARCH */}

                  <div className="border-b border-slate-100 p-2">
                    <div className="relative">
                      <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        autoFocus
                        value={search}
                        onChange={(event) =>
                          setSearch(
                            event.target.value
                          )
                        }
                        placeholder="Search project..."
                        className="h-10 w-full rounded-lg bg-slate-50 pl-9 pr-3 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 focus:bg-slate-100"
                      />
                    </div>
                  </div>

                  {/* PROJECTS */}

                  <div className="max-h-48 overflow-y-auto p-1">

                    {filteredProjects.length > 0 ? (
                      filteredProjects.map(
                        (project) => (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() =>
                              handleSelectProject(
                                project
                              )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-500">
                              {String(
                                project.name ||
                                  "P"
                              )
                                .slice(0, 1)
                                .toUpperCase()}
                            </span>

                            <span className="truncate">
                              {project.name}
                            </span>
                          </button>
                        )
                      )
                    ) : (
                      <div className="px-3 py-5 text-center text-[13px] text-slate-400">
                        {search
                          ? "No project found."
                          : "No projects available."}
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* CLEAR */}

              {selectedProject && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedProject(null)
                  }
                  className="mt-2 text-[11px] text-slate-400 hover:text-slate-700"
                >
                  Clear project
                </button>
              )}
            </div>

            {/* MEMBER */}

            <div>
              <label className="mb-2 block text-[13px] font-medium text-slate-700">
                Member
              </label>

              <input
                type="text"
                value={member}
                onChange={(event) =>
                  setMember(event.target.value)
                }
                placeholder="Enter member email or name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-800 outline-none placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!member.trim()}
              className="rounded-xl bg-slate-900 px-6 py-2.5 text-[13px] font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save
            </button>

          </div>

        </form>
      </div>
    </div>,
    document.body
  );
}