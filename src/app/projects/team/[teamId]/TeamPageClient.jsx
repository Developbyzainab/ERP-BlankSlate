"use client";

import { useParams } from "next/navigation";

import TeamOverview from "@/src/components/projects/TeamOverview";

export default function TeamPageClient() {
  const params = useParams();

  return (
    <TeamOverview
      teamId={params.teamId}
    />
  );
}