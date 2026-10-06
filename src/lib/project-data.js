"use client";

const STORAGE_KEY = "erp-dost-project-data-v1";

export const CURRENT_USER = {
  id: "current-user",
  name: "MT",
  email: "",
  role: "Owner",
};

const DEFAULT_DATA = {
  version: 1,

  currentUser: CURRENT_USER,

  teams: [
    {
      id: "team-default",
      name: "Default Team",
      description: "",
      ownerId: CURRENT_USER.id,
      members: [
        {
          id: CURRENT_USER.id,
          name: CURRENT_USER.name,
          email: CURRENT_USER.email,
          role: "Owner",
        },
      ],
      createdAt: "2026-01-01T00:00:00.000Z",
    },

    {
      id: "team-ibn-khushi",
      name: "Ibn Khushi",
      description: "",
      ownerId: CURRENT_USER.id,
      members: [
        {
          id: CURRENT_USER.id,
          name: CURRENT_USER.name,
          email: CURRENT_USER.email,
          role: "Owner",
        },
      ],
      createdAt: "2026-01-01T00:00:00.000Z",
    },
  ],

  projects: [
   {
  id: "project-dish-wash",
  teamId: "team-default",
  name: "Dish Wash",
  description: "",
  color: "indigo",
  favorite: false,
}
  ],

  invitations: [],
};

export function createId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function normalizeData(data) {
  if (!data || typeof data !== "object") {
    return cloneData(DEFAULT_DATA);
  }

  return {
    version: data.version || 1,

    currentUser: data.currentUser || CURRENT_USER,

    teams: Array.isArray(data.teams) ? data.teams : [],

    projects: Array.isArray(data.projects) ? data.projects : [],

    invitations: Array.isArray(data.invitations)
      ? data.invitations
      : [],
  };
}

export function getProjectData() {
  if (typeof window === "undefined") {
    return cloneData(DEFAULT_DATA);
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const freshData = cloneData(DEFAULT_DATA);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(freshData)
      );

      return freshData;
    }

    return normalizeData(JSON.parse(stored));
  } catch (error) {
    console.error("Project data load error:", error);

    return cloneData(DEFAULT_DATA);
  }
}

export function saveProjectData(data) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const normalized = normalizeData(data);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalized)
    );

    window.dispatchEvent(
      new CustomEvent("project-data-updated")
    );
  } catch (error) {
    console.error("Project data save error:", error);
  }
}

export function getCurrentUser(data) {
  return data?.currentUser || CURRENT_USER;
}

export function getTeamById(data, teamId) {
  return (
    data?.teams?.find((team) => team.id === teamId) || null
  );
}

export function getProjectById(data, projectId) {
  return (
    data?.projects?.find(
      (project) => project.id === projectId
    ) || null
  );
}

export function getTeamProjects(data, teamId) {
  return (data?.projects || []).filter(
    (project) => project.teamId === teamId
  );
}

export function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}