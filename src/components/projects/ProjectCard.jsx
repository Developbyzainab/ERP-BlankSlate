"use client";

import Link from "next/link";
import {
  Star,
  ListTodo,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const colorMap = {
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  slate: "bg-slate-700",
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onFavorite,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const projectColor =
    colorMap[project?.color] ||
    colorMap.violet;

  return (
    <div className="group relative w-[145px] shrink-0">
      <Link
        href={`/projects/project/${project.id}`}
        className="block h-[132px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      >
        <div className="flex items-start justify-between">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${projectColor} text-white`}
          >
            <ListTodo size={15} />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              onFavorite?.(project);
            }}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
              project.favorite
                ? "text-amber-500 opacity-100"
                : "text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-amber-500"
            }`}
            title="Add to favourite"
          >
            <Star
              size={15}
              fill={
                project.favorite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="truncate text-sm font-semibold text-slate-800">
            {project.name}
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            Project
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setMenuOpen((value) => !value);
        }}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-400 opacity-0 shadow-sm transition group-hover:opacity-100 hover:text-slate-900"
      >
        <MoreHorizontal size={16} />
      </button>

      {menuOpen && (
        <div className="absolute right-1 top-10 z-30 w-32 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onEdit?.(project);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onDelete?.(project);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}