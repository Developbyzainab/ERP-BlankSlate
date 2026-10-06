// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   X,
//   Users,
//   FolderKanban,
//   Plus,
// } from "lucide-react";

// function ModalShell({
//   open,
//   onClose,
//   children,
//   maxWidth = "max-w-lg",
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
//       <div
//         className={`relative w-full ${maxWidth} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
//       >
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
//         >
//           <X size={17} />
//         </button>

//         {children}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    CREATE TEAM MODAL
// ========================================================= */

// export function CreateTeamModal({
//   open,
//   onClose,
//   onCreate,
// }) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!open) {
//       setName("");
//       setDescription("");
//       setError("");
//     }
//   }, [open]);

//   function handleSubmit(event) {
//     event.preventDefault();

//     const cleanName = name.trim();

//     if (!cleanName) {
//       setError("Please enter a team name.");
//       return;
//     }

//     onCreate({
//       name: cleanName,
//       description: description.trim(),
//     });

//     setName("");
//     setDescription("");
//     setError("");
//   }

//   return (
//     <ModalShell
//       open={open}
//       onClose={onClose}
//       maxWidth="max-w-md"
//     >
//       <div className="bg-gradient-to-br from-slate-50 via-white to-violet-50 px-6 pb-6 pt-7">
//         <div className="mb-6">
//           <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
//             <Users size={20} />
//           </div>

//           <h2 className="text-xl font-semibold text-slate-900">
//             Create Team
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Create a new team for your projects.
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Team Name
//             </label>

//             <input
//               value={name}
//               onChange={(event) => {
//                 setName(event.target.value);
//                 setError("");
//               }}
//               placeholder="e.g. Marketing Team"
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//               autoFocus
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Description
//             </label>

//             <textarea
//               value={description}
//               onChange={(event) =>
//                 setDescription(event.target.value)
//               }
//               placeholder="Add a short description..."
//               rows={4}
//               className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//             />
//           </div>

//           {error && (
//             <p className="text-sm text-red-500">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
//           >
//             <Plus size={17} />
//             Create Team
//           </button>
//         </form>
//       </div>
//     </ModalShell>
//   );
// }

// /* =========================================================
//    INVITE PEOPLE MODAL
// ========================================================= */

// export function InvitePeopleModal({
//   open,
//   onClose,
//   team,
//   projects = [],
//   onInvite,
// }) {
//   const [email, setEmail] = useState("");
//   const [search, setSearch] = useState("");
//   const [selectedProjectIds, setSelectedProjectIds] =
//     useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!open) {
//       setEmail("");
//       setSearch("");
//       setSelectedProjectIds([]);
//       setError("");
//     }
//   }, [open]);

//   const filteredProjects = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     if (!query) {
//       return projects;
//     }

//     return projects.filter((project) =>
//       project.name.toLowerCase().includes(query)
//     );
//   }, [projects, search]);

//   function toggleProject(projectId) {
//     setSelectedProjectIds((current) => {
//       if (current.includes(projectId)) {
//         return current.filter(
//           (id) => id !== projectId
//         );
//       }

//       return [...current, projectId];
//     });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     const cleanEmail = email.trim();

//     if (!cleanEmail) {
//       setError("Please enter an email address.");
//       return;
//     }

//     onInvite({
//       email: cleanEmail,
//       projectIds: selectedProjectIds,
//     });

//     setEmail("");
//     setSearch("");
//     setSelectedProjectIds([]);
//     setError("");
//   }

//   return (
//     <ModalShell
//       open={open}
//       onClose={onClose}
//       maxWidth="max-w-lg"
//     >
//       <div className="bg-gradient-to-br from-slate-50 via-white to-violet-50 px-6 pb-6 pt-7">
//         <div className="mb-6">
//           <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
//             <Users size={20} />
//           </div>

//           <h2 className="text-xl font-semibold text-slate-900">
//             Invite Member in{" "}
//             {team?.name || "Team"}
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Send an invitation and optionally assign
//             projects.
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(event) => {
//                 setEmail(event.target.value);
//                 setError("");
//               }}
//               placeholder="member@example.com"
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//               autoFocus
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Projects
//             </label>

//             <div className="relative mb-3">
//               <Search
//                 size={16}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 value={search}
//                 onChange={(event) =>
//                   setSearch(event.target.value)
//                 }
//                 placeholder="Search projects..."
//                 className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//               />
//             </div>

//             <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2">
//               {filteredProjects.length === 0 ? (
//                 <div className="px-3 py-6 text-center text-sm text-slate-400">
//                   No projects available.
//                 </div>
//               ) : (
//                 filteredProjects.map((project) => {
//                   const selected =
//                     selectedProjectIds.includes(
//                       project.id
//                     );

//                   return (
//                     <button
//                       key={project.id}
//                       type="button"
//                       onClick={() =>
//                         toggleProject(project.id)
//                       }
//                       className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
//                         selected
//                           ? "bg-slate-100"
//                           : "hover:bg-slate-50"
//                       }`}
//                     >
//                       <span
//                         className={`flex h-4 w-4 items-center justify-center rounded border ${
//                           selected
//                             ? "border-slate-900 bg-slate-900"
//                             : "border-slate-300"
//                         }`}
//                       >
//                         {selected && (
//                           <span className="h-1.5 w-1.5 rounded-full bg-white" />
//                         )}
//                       </span>

//                       <FolderKanban
//                         size={16}
//                         className="text-slate-500"
//                       />

//                       <span className="text-sm font-medium text-slate-700">
//                         {project.name}
//                       </span>
//                     </button>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//           {error && (
//             <p className="text-sm text-red-500">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
//           >
//             Send Invite
//           </button>
//         </form>
//       </div>
//     </ModalShell>
//   );
// }

// /* =========================================================
//    PROJECT MODAL
// ========================================================= */

// export function ProjectModal({
//   open,
//   onClose,
//   onSave,
//   project = null,
//   teams = [],
//   defaultTeamId = "",
// }) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [teamId, setTeamId] = useState("");
//   const [color, setColor] = useState("violet");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!open) return;

//     setName(project?.name || "");
//     setDescription(project?.description || "");
//     setTeamId(
//       project?.teamId ||
//         defaultTeamId ||
//         teams[0]?.id ||
//         ""
//     );
//     setColor(project?.color || "violet");
//     setError("");
//   }, [
//     open,
//     project,
//     defaultTeamId,
//     teams,
//   ]);

//   function handleSubmit(event) {
//     event.preventDefault();

//     const cleanName = name.trim();

//     if (!cleanName) {
//       setError("Please enter a project name.");
//       return;
//     }

//     if (!teamId) {
//       setError("Please select a team.");
//       return;
//     }

//     onSave({
//       id: project?.id,
//       name: cleanName,
//       description: description.trim(),
//       teamId,
//       color,
//     });
//   }

//   const colors = [
//     {
//       value: "violet",
//       className: "bg-violet-500",
//     },
//     {
//       value: "blue",
//       className: "bg-blue-500",
//     },
//     {
//       value: "emerald",
//       className: "bg-emerald-500",
//     },
//     {
//       value: "orange",
//       className: "bg-orange-500",
//     },
//     {
//       value: "rose",
//       className: "bg-rose-500",
//     },
//     {
//       value: "slate",
//       className: "bg-slate-700",
//     },
//   ];

//   return (
//     <ModalShell
//       open={open}
//       onClose={onClose}
//       maxWidth="max-w-lg"
//     >
//       <div className="bg-gradient-to-br from-slate-50 via-white to-violet-50 px-6 pb-6 pt-7">
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-slate-900">
//             {project
//               ? "Edit Project"
//               : "Create Project"}
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Add your project details.
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Project Name
//             </label>

//             <input
//               value={name}
//               onChange={(event) => {
//                 setName(event.target.value);
//                 setError("");
//               }}
//               placeholder="e.g. Dish Wash"
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//               autoFocus
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Team
//             </label>

//             <select
//               value={teamId}
//               onChange={(event) =>
//                 setTeamId(event.target.value)
//               }
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//             >
//               <option value="">
//                 Select team
//               </option>

//               {teams.map((team) => (
//                 <option
//                   key={team.id}
//                   value={team.id}
//                 >
//                   {team.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Description
//             </label>

//             <textarea
//               value={description}
//               onChange={(event) =>
//                 setDescription(event.target.value)
//               }
//               placeholder="Add description..."
//               rows={4}
//               className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Color
//             </label>

//             <div className="flex gap-3">
//               {colors.map((item) => (
//                 <button
//                   key={item.value}
//                   type="button"
//                   onClick={() =>
//                     setColor(item.value)
//                   }
//                   className={`flex h-9 w-9 items-center justify-center rounded-full ${item.className} ${
//                     color === item.value
//                       ? "ring-2 ring-slate-900 ring-offset-2"
//                       : ""
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {error && (
//             <p className="text-sm text-red-500">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
//           >
//             {project
//               ? "Save Changes"
//               : "Create Project"}
//           </button>
//         </form>
//       </div>
//     </ModalShell>
//   );
// }

// /* =========================================================
//    CONFIRM MODAL
// ========================================================= */

// export function ConfirmModal({
//   open,
//   onClose,
//   onConfirm,
//   title = "Are you sure?",
//   description = "This action cannot be undone.",
//   confirmText = "Confirm",
// }) {
//   return (
//     <ModalShell
//       open={open}
//       onClose={onClose}
//       maxWidth="max-w-sm"
//     >
//       <div className="px-6 pb-6 pt-7">
//         <h2 className="text-lg font-semibold text-slate-900">
//           {title}
//         </h2>

//         <p className="mt-2 text-sm leading-6 text-slate-500">
//           {description}
//         </p>

//         <div className="mt-6 flex gap-3">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={onConfirm}
//             className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </ModalShell>
//   );
// }



"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Search,
  X,
} from "lucide-react";

/* =========================================================
   PORTAL
   Modal sidebar ke andar render nahi hoga.
   Direct document.body mein render hoga.
========================================================= */

function ModalPortal({ children }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

/* =========================================================
   COMMON MODAL
========================================================= */

function ModalOverlay({
  children,
  onClose,
  maxWidth = "520px",
}) {
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-[2px]">
        {/* BACKDROP */}

        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute inset-0 cursor-default"
        />

        {/* CENTER MODAL */}

        <div
          className="relative z-10 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.20)]"
          style={{ maxWidth }}
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

/* =========================================================
   HEADER
========================================================= */

function ModalHeader({
  title,
  description,
  onClose,
}) {
  return (
    <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
      <div className="min-w-0 pr-4">
        <h2 className="text-[18px] font-semibold text-slate-900">
          {title}
        </h2>

        {description ? (
          <p className="mt-1 text-[13px] text-slate-400">
            {description}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
      >
        <X size={17} />
      </button>
    </div>
  );
}

/* =========================================================
   CREATE TEAM MODAL
========================================================= */

export function CreateTeamModal({
  open,
  onClose,
  onCreate,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    onCreate?.({
      name: cleanName,
      description: description.trim(),
    });
  }

  return (
    <ModalOverlay
      onClose={onClose}
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader
          title="Create Team"
          description="Create a new team for your projects."
          onClose={onClose}
        />

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Team Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              autoFocus
              placeholder="Enter team name"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-800 outline-none placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              rows={4}
              placeholder="Enter team description"
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-[13px] text-slate-800 outline-none placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

           <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Member
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              autoFocus
              placeholder="Member"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-800 outline-none placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-500 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!name.trim()}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create Team
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}

/* =========================================================
   INVITE PEOPLE MODAL
========================================================= */

export function InvitePeopleModal({
  open,
  onClose,
  team,
  projects = [],
  onInvite,
}) {
  const [member, setMember] = useState("");

  /* Selected project */

  const [selectedProject, setSelectedProject] =
    useState(null);

  /* Dropdown open/close */

  const [projectDropdownOpen, setProjectDropdownOpen] =
    useState(false);

  /* Search INSIDE dropdown */

  const [projectSearch, setProjectSearch] =
    useState("");

  useEffect(() => {
    if (!open) {
      setMember("");
      setSelectedProject(null);
      setProjectDropdownOpen(false);
      setProjectSearch("");
    }
  }, [open]);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
    const search =
      projectSearch.trim().toLowerCase();

    if (!search) {
      return projects;
    }

    return projects.filter((project) =>
      String(project.name || "")
        .toLowerCase()
        .includes(search)
    );
  }, [projects, projectSearch]);

  if (!open) {
    return null;
  }

  /* =======================================================
     OPEN DROPDOWN
  ======================================================= */

  function openProjectDropdown() {
    setProjectDropdownOpen(true);
  }

  /* =======================================================
     SELECT PROJECT
  ======================================================= */

  function selectProject(project) {
    setSelectedProject(project);
    setProjectSearch("");
    setProjectDropdownOpen(false);
  }

  /* =======================================================
     SAVE
  ======================================================= */

  function handleSubmit(event) {
    event.preventDefault();

    const cleanMember = member.trim();

    if (!cleanMember) {
      return;
    }

    onInvite?.({
      email: cleanMember,

      projectIds: selectedProject
        ? [selectedProject.id]
        : [],
    });
  }

  return (
    <ModalOverlay
      onClose={onClose}
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit}>
        {/* =================================================
            HEADER
        ================================================== */}

        <ModalHeader
          title={`Invite Member in ${
            team?.name || "Default Team"
          }`}
          description="Invite a member to this team."
          onClose={onClose}
        />

        {/* =================================================
            BODY
        ================================================== */}

        <div className="space-y-5 px-6 py-6">
          {/* =================================================
              SELECT PROJECT
          ================================================== */}

          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Select Project
            </label>

            {/* SELECTED PROJECT FIELD */}

            <button
              type="button"
              onClick={openProjectDropdown}
              className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-3 text-left text-[13px] outline-none transition ${
                projectDropdownOpen
                  ? "border-slate-400 ring-2 ring-slate-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span
                className={
                  selectedProject
                    ? "font-medium text-slate-800"
                    : "text-slate-300"
                }
              >
                {selectedProject
                  ? selectedProject.name
                  : "Select or search project"}
              </span>

              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${
                  projectDropdownOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* =================================================
                DROPDOWN
            ================================================== */}

            {projectDropdownOpen && (
              <div className="relative z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
                {/* SEARCH INSIDE DROPDOWN */}

                <div className="border-b border-slate-100 p-2">
                  <div className="relative">
                    <Search
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(event) =>
                        setProjectSearch(
                          event.target.value
                        )
                      }
                      autoFocus
                      placeholder="Search project..."
                      className="h-10 w-full rounded-lg bg-slate-50 pl-9 pr-3 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 focus:bg-slate-100"
                    />
                  </div>
                </div>

                {/* PROJECT LIST */}

                <div className="max-h-48 overflow-y-auto p-1">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map(
                      (project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() =>
                            selectProject(
                              project
                            )
                          }
                          className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-500">
                            {String(
                              project.name || "P"
                            )
                              .slice(0, 1)
                              .toUpperCase()}
                          </span>

                          <span className="ml-2.5 truncate">
                            {project.name}
                          </span>
                        </button>
                      )
                    )
                  ) : (
                    <div className="px-3 py-5 text-center">
                      <p className="text-[13px] text-slate-400">
                        No project found.
                      </p>

                      {projectSearch ? (
                        <p className="mt-1 text-[11px] text-slate-300">
                          Try another project name.
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SELECTED PROJECT CLEAR */}

            {selectedProject ? (
              <button
                type="button"
                onClick={() =>
                  setSelectedProject(null)
                }
                className="mt-2 text-[11px] text-slate-400 hover:text-slate-700"
              >
                Clear selected project
              </button>
            ) : null}
          </div>

          {/* =================================================
              MEMBER
          ================================================== */}

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

        {/* =================================================
            FOOTER
        ================================================== */}

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
    </ModalOverlay>
  );
}

/* =========================================================
   PROJECT MODAL
========================================================= */

export function ProjectModal({
  open,
  onClose,
  onSave,
  teams = [],
  defaultTeamId = "",
  project = null,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [teamId, setTeamId] =
    useState(defaultTeamId);
  const [color, setColor] =
    useState("violet");

  useEffect(() => {
    if (!open) return;

    setName(project?.name || "");
    setDescription(
      project?.description || ""
    );
    setTeamId(
      project?.teamId ||
        defaultTeamId ||
        teams[0]?.id ||
        ""
    );
    setColor(project?.color || "violet");
  }, [
    open,
    project,
    defaultTeamId,
    teams,
  ]);

  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !teamId) {
      return;
    }

    onSave?.({
      id: project?.id,
      name: name.trim(),
      description: description.trim(),
      teamId,
      color,
    });
  }

  return (
    <ModalOverlay
      onClose={onClose}
      maxWidth="560px"
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader
          title={
            project
              ? "Edit Project"
              : "Create Project"
          }
          description={
            project
              ? "Update project information."
              : "Create a new project for your team."
          }
          onClose={onClose}
        />

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Project Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              autoFocus
              placeholder="Enter project name"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-[13px] outline-none placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Team
            </label>

            <select
              value={teamId}
              onChange={(event) =>
                setTeamId(event.target.value)
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none focus:border-slate-400"
            >
              <option value="">
                Select a team
              </option>

              {teams.map((team) => (
                <option
                  key={team.id}
                  value={team.id}
                >
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              rows={4}
              placeholder="Enter project description"
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-[13px] outline-none placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Color
            </label>

            <select
              value={color}
              onChange={(event) =>
                setColor(event.target.value)
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-slate-400"
            >
              <option value="violet">
                Violet
              </option>
              <option value="indigo">
                Indigo
              </option>
              <option value="blue">
                Blue
              </option>
              <option value="emerald">
                Emerald
              </option>
              <option value="amber">
                Amber
              </option>
              <option value="rose">
                Rose
              </option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-[13px] text-slate-500 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              !name.trim() || !teamId
            }
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-slate-800 disabled:opacity-40"
          >
            {project
              ? "Save Changes"
              : "Create Project"}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}

/* =========================================================
   CONFIRM MODAL
========================================================= */

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <ModalOverlay
      onClose={onClose}
      maxWidth="420px"
    >
      <div>
        <ModalHeader
          title={title}
          description={description}
          onClose={onClose}
        />

        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-500 hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================================
   OLD NAME SUPPORT
========================================================= */

export const TeamModal = CreateTeamModal;