"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Info,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  SlidersHorizontal,
  Star,
  Users,
  X,
  ListFilter,
  Paperclip,
  MessageCircle,
} from "lucide-react";

import {
  getProjectData,
  saveProjectData,
} from "@/src/lib/project-data";

function ModalShell({ children, onClose, width = "520px" }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-[2px]">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        style={{ maxWidth: width }}
      >
        {children}
      </div>
    </div>
  );
}

function ShareProjectModal({
  open,
  onClose,
  project,
  data,
}) {
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  if (!open) return null;

  const members =
    data?.teams
      ?.find((team) => team.id === project?.teamId)
      ?.members || [];

  function addTag() {
    const value = tag.trim();

    if (!value) return;

    if (!tags.includes(value)) {
      setTags((current) => [...current, value]);
    }

    setTag("");
  }

  function removeTag(value) {
    setTags((current) =>
      current.filter((item) => item !== value)
    );
  }

  return (
    <ModalShell
      onClose={onClose}
      width="560px"
    >
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Share {project?.name || "Dish Wash"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Invite people to collaborate on this project.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-5 px-6 py-6">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Invite with email
          </label>

          <div className="mt-3 h-px w-full bg-slate-200" />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-slate-500">
            Add tag
          </label>

          <div className="min-h-[42px] rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                >
                  {item}

                  <button
                    type="button"
                    onClick={() => removeTag(item)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              <input
                value={tag}
                onChange={(event) =>
                  setTag(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag..."
                className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-slate-300"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-slate-500">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter email address"
            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-slate-400"
          />
        </div>

        <div className="rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <span className="text-sm font-semibold text-slate-800">
              Project Members
            </span>

            <button
              type="button"
              className="text-xs font-medium text-slate-500 hover:text-slate-900"
            >
              Manage notifications
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {members.length > 0 ? (
              members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                      {(member.name || "M")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {member.name || "MT"}
                      </p>

                      {member.email ? (
                        <p className="text-[11px] text-slate-400">
                          {member.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    {member.role || "Owner"}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-4 text-sm text-slate-400">
                No project members yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-100 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Done
        </button>
      </div>
    </ModalShell>
  );
}

function EmptyTab({ icon: Icon, title }) {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <Icon size={21} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-700">
        {title}
      </h3>

      <p className="mt-1 text-xs text-slate-400">
        Nothing here yet.
      </p>
    </div>
  );
}

export default function ProjectWorkspace({
  projectId,
}) {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Board");
  const [shareOpen, setShareOpen] = useState(false);

  const [columns, setColumns] = useState([
    {
      id: "column-1",
      name: "",
    },
  ]);

  useEffect(() => {
    setData(getProjectData());
  }, []);

  const project = useMemo(() => {
    if (!data) return null;

    return (
      data.projects?.find(
        (item) => item.id === projectId
      ) || null
    );
  }, [data, projectId]);

  function toggleFavorite() {
    if (!data || !project) return;

    const updated = {
      ...data,
      projects: data.projects.map((item) =>
        item.id === project.id
          ? {
              ...item,
              favorite: !item.favorite,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    };

    saveProjectData(updated);
    setData(updated);
  }

  function addColumn() {
    setColumns((current) => [
      ...current,
      {
        id: `column-${Date.now()}`,
        name: "",
      },
    ]);
  }

  if (!data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-slate-400">
          Loading...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-800">
            Project not found
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            This project does not exist.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      name: "List",
      icon: List,
    },
    {
      name: "Board",
      icon: List,
    },
    {
      name: "Files",
      icon: Paperclip,
    },
    {
      name: "Conversation",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#dfeaff]">
      {/* =====================================================
          PROJECT HEADER
      ====================================================== */}

      <header className="relative border-b border-white/70 bg-gradient-to-r from-[#dbe9ff] via-[#eee9ff] to-[#e7e8fb] px-6 pt-7">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 items-start gap-5">
            {/* PROJECT ICON */}

            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[17px] bg-[#6353f5] text-white shadow-sm">
              <List size={40} strokeWidth={2.5} />
            </div>

            <div className="min-w-0">
              {/* NAME */}

              <div className="flex items-center gap-3">
                <h1 className="text-[32px] font-normal tracking-tight text-slate-900">
                  {project.name}
                </h1>

                <button
                  type="button"
                  className="text-slate-400 transition hover:text-slate-700"
                >
                  <ChevronDown size={21} />
                </button>

                <button
                  type="button"
                  className="text-slate-400 transition hover:text-slate-700"
                  title="Project information"
                >
                  <Info size={24} />
                </button>

                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`transition ${
                    project.favorite
                      ? "text-amber-500"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title="Add to favourite"
                >
                  <Star
                    size={27}
                    strokeWidth={1.8}
                    fill={
                      project.favorite
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              {/* TABS */}

              <div className="mt-3 flex items-center gap-9">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active =
                    activeTab === tab.name;

                  return (
                    <button
                      key={tab.name}
                      type="button"
                      onClick={() =>
                        setActiveTab(tab.name)
                      }
                      className={`relative pb-3 text-[17px] transition ${
                        active
                          ? "font-medium text-slate-800"
                          : "text-[#8994ba] hover:text-slate-700"
                      }`}
                    >
                      {tab.name}

                      {active && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SHARE */}

          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="mr-2 mt-2 flex items-center gap-2 text-[17px] text-[#8994ba] transition hover:text-slate-800"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white/40 text-sm text-[#8994ba]">
              MT
            </div>

            <Users size={22} />

            <span>Share</span>
          </button>
        </div>
      </header>

      {/* =====================================================
          BOARD
      ====================================================== */}

      {activeTab === "Board" && (
        <div className="mx-0 min-h-[calc(100vh-210px)] bg-white px-9 pt-5">
          {/* BOARD TOOLBAR */}

          <div className="flex items-center justify-end gap-8 text-[#8490b8]">
            <button
              type="button"
              className="flex items-center gap-1.5 text-[17px] font-medium transition hover:text-slate-800"
            >
              <CheckCircle2
                size={18}
                fill="currentColor"
              />
              Incomplete tasks
            </button>

            <button
              type="button"
              className="flex items-center gap-2 text-[17px] font-medium transition hover:text-slate-800"
            >
              <ListFilter size={19} />
              Sort
            </button>

            <button
              type="button"
              className="flex items-center gap-2 text-[17px] font-medium transition hover:text-slate-800"
            >
              <CheckCircle2 size={18} />
              Fields
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-slate-100 hover:text-slate-800"
            >
              <MoreHorizontal size={21} />
            </button>
          </div>

          {/* BOARD CONTENT */}

          <div className="mt-11 overflow-x-auto pb-10">
            <div className="flex min-w-max items-start gap-7">
              {/* FIRST COLUMN */}

              {columns.map((column, index) => (
                <div
                  key={column.id}
                  className="w-[420px] shrink-0"
                >
                  {/* COLUMN TITLE */}

                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[25px] font-normal text-[#8793bb]">
                        {index === 0
                          ? "Untitled Section"
                          : "Untitled Section"}
                      </span>

                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8793bb] transition hover:bg-slate-100"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>

                  {/* EMPTY TASK AREA */}

                  <div className="mt-5 overflow-hidden rounded-[3px] border border-slate-100 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                    <button
                      type="button"
                      className="flex h-[48px] w-full items-center justify-center text-[#8b96ba] transition hover:bg-slate-50 hover:text-slate-700"
                    >
                      <Plus size={28} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}

              {/* ADD COLUMN */}

              <button
                type="button"
                onClick={addColumn}
                className="mt-1 flex shrink-0 items-center gap-2 text-[25px] text-[#8793bb] transition hover:text-slate-700"
              >
                <Plus size={27} strokeWidth={1.7} />
                Add column
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          OTHER TABS
      ====================================================== */}

      {activeTab === "List" && (
        <div className="bg-white px-9">
          <EmptyTab
            icon={List}
            title="List view"
          />
        </div>
      )}

      {activeTab === "Files" && (
        <div className="bg-white px-9">
          <EmptyTab
            icon={Paperclip}
            title="Files"
          />
        </div>
      )}

      {activeTab === "Conversation" && (
        <div className="bg-white px-9">
          <EmptyTab
            icon={MessageCircle}
            title="Conversation"
          />
        </div>
      )}

      {/* SHARE MODAL */}

      <ShareProjectModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        project={project}
        data={data}
      />
    </div>
  );
}