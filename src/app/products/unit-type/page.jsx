"use client";

import MasterList from "@/src/components/master-data/MasterList";

export default function UnitTypePage() {
  return (
    <MasterList
      title="Unit Type"
      addLabel="ADD UNIT TYPE"
      storageKey="unit-types"
      type="unit-type"
      columns={[
        {
          key: "sl",
          label: "SL",
        },
        {
          key: "name",
          label: "NAME",
        },
        {
          key: "description",
          label: "DESCRIPTION",
        },
        {
          key: "status",
          label: "STATUS",
        },
      ]}
      fields={[
        {
          name: "name",
          label: "NAME",
          placeholder: "Enter unit type",
        },
        {
          name: "description",
          label: "DESCRIPTION",
          placeholder: "Enter description",
          type: "textarea",
          fullWidth: true,
        },
      ]}
    />
  );
}