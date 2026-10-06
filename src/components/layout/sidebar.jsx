"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  ShoppingCart,
  Receipt,
  Users,
  Package,
  Warehouse,
  ShoppingBag,
  FileText,
  Landmark,
  ArrowLeftRight,
  MapPin,
  ChevronDown,
  ChevronRight,
  X,
  UserRoundCog,
  CalendarDays,
  Settings,
  Palette,
  Wrench,
  DatabaseBackup,
  Activity,
  Plus,
  MoreHorizontal,
  Star,
  ListTodo,
  BarChart3,
} from "lucide-react";

import {
  createId,
  getCurrentUser,
  getInitials,
  getProjectData,
  saveProjectData,
} from "@/src/lib/project-data";

import { CreateTeamModal } from "../projects/ProjectModals";
import InviteMemberModal from "../projects/InviteMemberModal";

/* =========================================================
   ERP NAVIGATION
========================================================= */

const navigation = [
  {
    name: "POS",
    icon: ShoppingCart,
    children: [
      {
        name: "POS SALE",
        href: "/pos/sale",
      },
    ],
  },

  {
    name: "SALE",
    icon: Receipt,
    children: [
      {
        name: "SALE",
        href: "/sales",
      },
      {
        name: "SALE RETURN",
        href: "/sales/return",
      },
    ],
  },

  {
    name: "CONTACTS",
    icon: Users,
    children: [
      {
        name: "ADD CONTACTS",
        href: "/contacts/add",
      },
      {
        name: "SUPPLIER",
        href: "/contacts/supplier",
      },
      {
        name: "CUSTOMER",
        href: "/contacts/customer",
      },
    ],
  },

  /* =======================================================
     PRODUCTS
  ======================================================= */

  {
    name: "PRODUCTS",
    icon: Package,
    children: [
      {
        name: "PRODUCTS LIST",
        href: "/products",
      },
      {
        name: "SERVICE",
        href: "/products/service",
      },
      {
        name: "ADD PRODUCT",
        href: "/products/add-product",
      },
      {
        name: "CATEGORY",
        href: "/products/category",
      },
      {
        name: "BRAND",
        href: "/products/brand",
      },
      {
        name: "MODEL",
        href: "/products/model",
      },
      {
        name: "UNIT TYPE",
        href: "/products/unit-type",
      },
      {
        name: "VARIANT",
        href: "/products/variant",
      },

      {
        name: "PRINT LABEL",
        href: "/products/print-label",
      },
    ],
  },

  {
    name: "INVENTORY",
    icon: Warehouse,
    children: [
      {
        name: "ADD OPENING STOCK",
        href: "/inventory/opening-stock",
      },
      {
        name: "RECEIVE YOUR PRODUCT",
        href: "/inventory/receive-product",
      },
      {
        name: "PRODUCT COSTING (SALES)",
        href: "/inventory/product-costing",
      },
      {
        name: "STOCK TRANSFER",
        href: "/inventory/stock-transfer",
      },
      {
        name: "STOCK LIST",
        href: "/inventory/stock-list",
      },
      {
        name: "PRODUCT MOVEMENT",
        href: "/inventory/product-movement",
      },
      {
        name: "STOCK ADJUSTMENT",
        href: "/inventory/stock-adjustment",
      },
      {
        name: "PRODUCT INFO",
        href: "/inventory/product-info",
      },
    ],
  },

  {
    name: "PURCHASE",
    icon: ShoppingBag,
    children: [
      {
        name: "PURCHASE ORDER",
        href: "/purchase/order",
      },
      {
        name: "STOCK ALERT LIST",
        href: "/purchase/stock-alert",
      },
      {
        name: "PURCHASE RETURN LIST",
        href: "/purchase/return",
      },
    ],
  },

  {
    name: "C&F QUOTATIONS",
    icon: FileText,
    children: [
      {
        name: "QUOTATION",
        href: "/quotation",
      },
    ],
  },

  {
    name: "ACCOUNTS",
    icon: Landmark,
    children: [
      {
        name: "ADD EXPENSE",
        href: "/accounts/add-expense",
      },
      {
        name: "EXPENSE LISTS",
        href: "/accounts/expense-list",
      },
      {
        name: "ADD INCOME",
        href: "/accounts/add-income",
      },
      {
        name: "INCOME LIST",
        href: "/accounts/income-list",
      },
      {
        name: "BANK ACCOUNTS",
        href: "/accounts/bank-accounts",
      },
      {
        name: "OPENING BALANCE",
        href: "/accounts/opening-balance",
      },
      {
        name: "CHARTS OF ACCOUNTS",
        href: "/accounts/charts-of-accounts",
      },

      /* REPORT NESTED DROPDOWN */

      {
        name: "REPORT",
        icon: BarChart3,
        children: [
          {
            name: "TRANSACTIONS",
            href: "/accounts/report/transactions",
          },
          {
            name: "STATEMENT",
            href: "/accounts/report/statement",
          },
          {
            name: "PROFIT & LOSS",
            href: "/accounts/report/profit-loss",
          },
          {
            name: "ACCOUNT BALANCE",
            href: "/accounts/report/account-balance",
          },
          {
            name: "INCOME BY CUSTOMER",
            href: "/accounts/report/income-by-customer",
          },
          {
            name: "EXPENSE BY SUPPLIER",
            href: "/accounts/report/expense-by-supplier",
          },
        ],
      },

      {
        name: "SALES TAX",
        href: "/accounts/sales-tax",
      },
    ],
  },

  {
    name: "TRANSFER",
    icon: ArrowLeftRight,
    children: [
      {
        name: "MAKE A TRANSFER",
        href: "/transfer/make",
      },
      {
        name: "TRANSFERED LISTS",
        href: "/transfer/list",
      },
    ],
  },

  {
    name: "LOCATION",
    icon: MapPin,
    children: [
      {
        name: "BRANCH",
        href: "/location/branch",
      },
      {
        name: "WAREHOUSE",
        href: "/location/warehouse",
      },
    ],
  },

  {
    name: "HUMAN RESOURCE",
    icon: UserRoundCog,
    children: [
      {
        name: "STAFF",
        href: "/human-resource/staff",
      },
      {
        name: "ROLE",
        href: "/human-resource/role",
      },
      {
        name: "DEPARTMENT",
        href: "/human-resource/department",
      },
      {
        name: "ATTENDANCE",
        href: "/human-resource/attendance",
      },
      {
        name: "ATTENDANCE REPORT",
        href: "/human-resource/attendance-report",
      },
      {
        name: "EVENT",
        href: "/human-resource/event",
      },
      {
        name: "PAYROLL",
        href: "/human-resource/payroll",
      },
      {
        name: "PAYROLL REPORTS",
        href: "/human-resource/payroll-reports",
      },
      {
        name: "LOAN APPLY",
        href: "/human-resource/loan-apply",
      },
      {
        name: "LOAN HISTORY",
        href: "/human-resource/loan-history",
      },
      {
        name: "LOAN APPROVAL",
        href: "/human-resource/loan-approval",
      },
    ],
  },

  {
    name: "LEAVE",
    icon: CalendarDays,
    children: [
      {
        name: "LEAVE TYPE",
        href: "/leave/type",
      },
      {
        name: "LEAVE DEFINE",
        href: "/leave/define",
      },
      {
        name: "APPLY LEAVE",
        href: "/leave/apply",
      },
      {
        name: "APPROVE LEAVE REQUEST",
        href: "/leave/approve",
      },
      {
        name: "PENDING LEAVE",
        href: "/leave/pending",
      },
      {
        name: "HOLIDAY SETUP",
        href: "/leave/holiday",
      },
      {
        name: "CARRY FORWARD",
        href: "/leave/carry-forward",
      },
    ],
  },

  {
    name: "SYSTEM SETTINGS",
    icon: Settings,
    children: [
      {
        name: "SETTINGS",
        href: "/settings",
      },
      {
        name: "PDF FONTS",
        href: "/settings/pdf-fonts",
      },
      {
        name: "PAYMENT METHOD SETTING",
        href: "/settings/payment-method",
      },
      {
        name: "TAX",
        href: "/settings/tax",
      },
      {
        name: "CITY",
        href: "/settings/city",
      },
      {
        name: "STATE",
        href: "/settings/state",
      },
      {
        name: "COUNTRY",
        href: "/settings/country",
      },
      {
        name: "LANGUAGE",
        href: "/settings/language",
      },
      {
        name: "CURRENCY",
        href: "/settings/currency",
      },
      {
        name: "INTRO PREFIX",
        href: "/settings/intro-prefix",
      },
      {
        name: "MODULE MANAGER",
        href: "/settings/module-manager",
      },
      {
        name: "UPDATE",
        href: "/settings/update",
      },
    ],
  },

  {
    name: "STYLES",
    icon: Palette,
    children: [
      {
        name: "BACKGROUND",
        href: "/styles/background",
      },
      {
        name: "THEME CUSTOMIZATION",
        href: "/styles/theme-customization",
      },
      {
        name: "CHANGE VIEW",
        href: "/styles/change-view",
      },
    ],
  },

  /* NO DROPDOWN */

  {
    name: "UTILITIES",
    href: "/utilities",
    icon: Wrench,
  },

  {
    name: "BACKUPS",
    href: "/backups",
    icon: DatabaseBackup,
  },

  {
    name: "ALL ACTIVITY LOGS",
    icon: Activity,
    children: [
      {
        name: "ACTIVITY LOGS",
        href: "/activity-logs",
      },
      {
        name: "LOGIN",
        href: "/activity-logs/login",
      },
      {
        name: "LOGOUT-ACTIVITY",
        href: "/activity-logs/logout",
      },
    ],
  },
];

/* =========================================================
   PROJECT NAVIGATION
========================================================= */

function ProjectNavigation({
  isSidebarOpen,
  closeSidebar,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [data, setData] = useState(null);

  const [projectOpen, setProjectOpen] =
    useState(false);

  const [expandedTeams, setExpandedTeams] =
    useState({});

  const [teamMenuId, setTeamMenuId] =
    useState(null);

  const [createTeamOpen, setCreateTeamOpen] =
    useState(false);

  const [inviteTeam, setInviteTeam] =
    useState(null);

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

  const teams = data?.teams || [];

  const currentUser = getCurrentUser(data);

  function toggleTeam(teamId) {
    setExpandedTeams((current) => ({
      ...current,
      [teamId]: !current[teamId],
    }));
  }

  function openTeam(teamId) {
    router.push(`/projects/team/${teamId}`);
    closeSidebar?.();
  }

  function openProject(projectId) {
    router.push(`/projects/project/${projectId}`);
    closeSidebar?.();
  }

  function createTeam(values) {
    if (!data) return;

    const now = new Date().toISOString();

    const newTeam = {
      id: createId("team"),
      name: values.name,
      description: values.description || "",
      ownerId: currentUser.id,
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email || "",
          role: "Owner",
        },
      ],
      createdAt: now,
    };

    const updatedData = {
      ...data,
      teams: [...data.teams, newTeam],
    };

    saveProjectData(updatedData);
    setData(updatedData);
    setCreateTeamOpen(false);

    setExpandedTeams((current) => ({
      ...current,
      [newTeam.id]: true,
    }));

    router.push(`/projects/team/${newTeam.id}`);
  }

  function inviteMember(values) {
    if (!data || !inviteTeam) return;

    const invitation = {
      id: createId("invite"),
      teamId: inviteTeam.id,
      email: values.email,
      projectIds: values.projectIds || [],
      status: "pending",
      createdAt: new Date().toISOString(),
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
    setInviteTeam(null);
  }

  function removeMe(teamId) {
    if (!data) return;

    const team = data.teams.find(
      (item) => item.id === teamId
    );

    if (!team) return;

    const remainingMembers = (
      team.members || []
    ).filter(
      (member) =>
        member.id !== currentUser.id
    );

    const nextOwner =
      team.ownerId === currentUser.id
        ? remainingMembers[0]?.id || null
        : team.ownerId;

    const updatedData = {
      ...data,
      teams: data.teams.map((item) =>
        item.id === teamId
          ? {
              ...item,
              members: remainingMembers,
              ownerId: nextOwner,
            }
          : item
      ),
    };

    saveProjectData(updatedData);
    setData(updatedData);
    setTeamMenuId(null);
  }

  function toggleFavorite(projectId) {
    if (!data) return;

    const updatedData = {
      ...data,
      projects: data.projects.map(
        (project) =>
          project.id === projectId
            ? {
                ...project,
                favorite: !project.favorite,
              }
            : project
      ),
    };

    saveProjectData(updatedData);
    setData(updatedData);
  }

  return (
    <>
      <div className="mt-2">

        {/* PROJECT HEADER */}

        <button
          type="button"
          onClick={() =>
            setProjectOpen((value) => !value)
          }
          className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
            projectOpen
              ? "text-slate-950"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          <span className="flex items-center gap-3">
            <FolderKanban size={17} />

            <span>PROJECTS</span>
          </span>

          {projectOpen ? (
            <ChevronDown size={15} />
          ) : (
            <ChevronRight size={15} />
          )}
        </button>

        {projectOpen && (
          <div className="ml-4 mt-1 border-l border-slate-200 pl-3">

            {/* TEAMS */}

            <div className="mt-2 space-y-1">

              {teams.map((team) => {
                const expanded =
                  Boolean(
                    expandedTeams[team.id]
                  );

                const teamProjects =
                  data.projects.filter(
                    (project) =>
                      project.teamId ===
                      team.id
                  );

                const activeTeam =
                  pathname ===
                    `/projects/team/${team.id}` ||
                  pathname.startsWith(
                    `/projects/team/${team.id}/`
                  );

                return (
                  <div
                    key={team.id}
                    className="group relative"
                  >

                    {/* TEAM ROW */}

                    <div
                      className={`flex items-center gap-1 rounded-lg ${
                        activeTeam
                          ? "text-slate-950"
                          : "text-slate-600"
                      }`}
                    >

                      <button
                        type="button"
                        onClick={() =>
                          toggleTeam(team.id)
                        }
                        className="flex h-7 w-6 shrink-0 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-900"
                      >
                        {expanded ? (
                          <ChevronDown size={13} />
                        ) : (
                          <ChevronRight size={13} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openTeam(team.id)
                        }
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 py-1.5 text-left"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[8px] font-bold text-white">
                          {getInitials(team.name)}
                        </span>

                        <span className="truncate text-[11px] font-semibold uppercase">
                          {team.name}
                        </span>
                      </button>

                      {/* PLUS */}

                      <button
                        type="button"
                        onClick={() =>
                          setCreateTeamOpen(true)
                        }
                        className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-900 group-hover:flex"
                        title="Create Team"
                      >
                        <Plus size={12} />
                      </button>

                      {/* THREE DOTS */}

                      <button
                        type="button"
                        onClick={() =>
                          setTeamMenuId(
                            (current) =>
                              current === team.id
                                ? null
                                : team.id
                          )
                        }
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    {/* TEAM MENU */}

                    {teamMenuId === team.id && (
                      <div className="absolute right-1 top-8 z-50 w-32 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">

                        {(team.members || []).some(
                          (member) =>
                            member.id ===
                            currentUser.id
                        ) ? (
                          <button
                            type="button"
                            onClick={() =>
                              removeMe(team.id)
                            }
                            className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-[10px] font-medium text-red-600 hover:bg-red-50"
                          >
                            REMOVE ME
                          </button>
                        ) : (
                          <span className="block px-3 py-2 text-[10px] text-slate-400">
                            NOT A MEMBER
                          </span>
                        )}

                      </div>
                    )}

                    {/* TEAM CONTENT */}

                    {expanded && (
                      <div className="ml-6 border-l border-slate-100 pl-3">

                        {/* MEMBERS */}

                        {(team.members || []).map(
                          (member) => (
                            <div
                              key={member.id}
                              className="flex items-center gap-2 py-1"
                            >
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[7px] font-bold text-slate-700">
                                {getInitials(
                                  member.name
                                )}
                              </span>

                              <span className="truncate text-[10px] font-medium uppercase text-slate-500">
                                {member.name}
                              </span>
                            </div>
                          )
                        )}

                        {/* INVITE */}

                        <button
                          type="button"
                          onClick={() =>
                            setInviteTeam(team)
                          }
                          className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-400 transition hover:bg-slate-50 hover:text-slate-800"
                        >
                          <Plus size={11} />
                          INVITE PEOPLE
                        </button>

                        {/* PROJECTS */}

                        <div className="mt-1 space-y-0.5">

                          {teamProjects.map(
                            (project) => {
                              const active =
                                pathname ===
                                `/projects/project/${project.id}`;

                              return (
                                <div
                                  key={project.id}
                                  className={`group/project flex items-center gap-1 rounded-lg ${
                                    active
                                      ? "text-slate-950"
                                      : "text-slate-500"
                                  }`}
                                >

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openProject(
                                        project.id
                                      )
                                    }
                                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2 py-1.5 text-left"
                                  >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100">
                                      <ListTodo size={10} />
                                    </span>

                                    <span className="truncate text-[10px] font-medium uppercase">
                                      {project.name}
                                    </span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      toggleFavorite(
                                        project.id
                                      )
                                    }
                                    className={`mr-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-md ${
                                      project.favorite
                                        ? "text-amber-500"
                                        : "text-slate-300 opacity-0 group-hover/project:opacity-100 hover:text-amber-500"
                                    }`}
                                    title="Add to favourite"
                                  >
                                    <Star
                                      size={11}
                                      fill={
                                        project.favorite
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  </button>

                                </div>
                              );
                            }
                          )}

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

            {/* CREATE TEAM */}

            <button
              type="button"
              onClick={() =>
                setCreateTeamOpen(true)
              }
              className="mt-2 flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-400 transition hover:bg-slate-50 hover:text-slate-800"
            >
              <Plus size={12} />
              CREATE TEAM
            </button>

          </div>
        )}
      </div>

      <CreateTeamModal
        open={createTeamOpen}
        onClose={() =>
          setCreateTeamOpen(false)
        }
        onCreate={createTeam}
      />

      <InviteMemberModal
        open={Boolean(inviteTeam)}
        onClose={() => setInviteTeam(null)}
        team={inviteTeam}
        projects={
          inviteTeam
            ? data?.projects?.filter(
                (project) =>
                  project.teamId ===
                  inviteTeam.id
              ) || []
            : []
        }
        onInvite={inviteMember}
      />
    </>
  );
}

/* =========================================================
   MAIN SIDEBAR
========================================================= */

export default function Sidebar({
  isOpen = true,
  setIsOpen,
}) {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] =
    useState(null);

  const [openNestedMenu, setOpenNestedMenu] =
    useState(null);

  function closeSidebar() {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }

  function isActive(href) {
    if (!href) return false;

    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <>
      {/* MOBILE OVERLAY */}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 cursor-pointer bg-black/30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`erp-sidebar fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* LOGO */}

        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-100 px-5">

          <Link
            href="/"
            onClick={closeSidebar}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              E
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">
                ERP DOST
              </p>

              <p className="text-[10px] text-slate-400">
                MANAGEMENT SYSTEM
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <X size={18} />
          </button>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto px-3 py-4">

          <nav className="space-y-1">

            {/* DASHBOARD */}

            <Link
              href="/"
              onClick={closeSidebar}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${
                isActive("/")
                  ? "font-semibold text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <LayoutDashboard size={17} />

              <span>DASHBOARD</span>
            </Link>

            {/* PROJECTS */}

            <ProjectNavigation
              isSidebarOpen={isOpen}
              closeSidebar={closeSidebar}
            />

            {/* OTHER NAVIGATION */}

            {navigation.map((item) => {
              const Icon = item.icon;

              const hasChildren =
                item.children?.length > 0;

              const active =
                item.href
                  ? isActive(item.href)
                  : item.children?.some(
                      (child) =>
                        child.href &&
                        isActive(child.href)
                    ) ||
                    item.children?.some(
                      (child) =>
                        child.children?.some(
                          (nested) =>
                            isActive(
                              nested.href
                            )
                        )
                    );

              /* DIRECT LINK */

              if (!hasChildren) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${
                      active
                        ? "font-semibold text-slate-950"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    <Icon size={17} />

                    <span>{item.name}</span>
                  </Link>
                );
              }

              /* MAIN DROPDOWN */

              const opened =
                openMenu === item.name;

              return (
                <div key={item.name}>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(
                        opened
                          ? null
                          : item.name
                      )
                    }
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-[13px] transition ${
                      active
                        ? "font-semibold text-slate-950"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >

                    <span className="flex items-center gap-3">

                      <Icon size={17} />

                      <span>
                        {item.name}
                      </span>

                    </span>

                    {opened ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}

                  </button>

                  {opened && (
                    <div className="ml-5 mt-1 space-y-0.5 border-l border-slate-100 pl-3">

                      {item.children.map(
                        (child) => {

                          const hasNested =
                            child.children?.length >
                            0;

                          /* NESTED DROPDOWN */

                          if (hasNested) {

                            const nestedKey =
                              `${item.name}-${child.name}`;

                            const nestedOpened =
                              openNestedMenu ===
                              nestedKey;

                            const nestedActive =
                              child.children.some(
                                (nested) =>
                                  isActive(
                                    nested.href
                                  )
                              );

                            return (
                              <div
                                key={child.name}
                              >

                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenNestedMenu(
                                      nestedOpened
                                        ? null
                                        : nestedKey
                                    )
                                  }
                                  className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-[11px] transition ${
                                    nestedActive
                                      ? "font-semibold text-slate-950"
                                      : "text-slate-500 hover:text-slate-900"
                                  }`}
                                >

                                  <span className="flex items-center gap-2">

                                    {child.icon && (
                                      <child.icon
                                        size={12}
                                      />
                                    )}

                                    <span>
                                      {child.name}
                                    </span>

                                  </span>

                                  {nestedOpened ? (
                                    <ChevronDown
                                      size={12}
                                    />
                                  ) : (
                                    <ChevronRight
                                      size={12}
                                    />
                                  )}

                                </button>

                                {nestedOpened && (
                                  <div className="ml-3 mt-1 space-y-0.5 border-l border-slate-100 pl-2">

                                    {child.children.map(
                                      (nested) => (
                                        <Link
                                          key={
                                            nested.href
                                          }
                                          href={
                                            nested.href
                                          }
                                          onClick={
                                            closeSidebar
                                          }
                                          className={`block cursor-pointer rounded-lg px-3 py-1.5 text-[10px] transition ${
                                            isActive(
                                              nested.href
                                            )
                                              ? "font-semibold text-slate-950"
                                              : "text-slate-500 hover:text-slate-900"
                                          }`}
                                        >
                                          {
                                            nested.name
                                          }
                                        </Link>
                                      )
                                    )}

                                  </div>
                                )}

                              </div>
                            );
                          }

                          /* NORMAL CHILD */

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={
                                closeSidebar
                              }
                              className={`block cursor-pointer rounded-lg px-3 py-1.5 text-[11px] transition ${
                                isActive(
                                  child.href
                                )
                                  ? "font-semibold text-slate-950"
                                  : "text-slate-500 hover:text-slate-900"
                              }`}
                            >
                              {child.name}
                            </Link>
                          );
                        }
                      )}

                    </div>
                  )}

                </div>
              );
            })}

          </nav>

        </div>

      </aside>
    </>
  );
}