"use client";

import MasterList from "@/src/components/master-data/MasterList";

export default function BrandPage() {
  return (
    <MasterList
      title="Brand"
      addLabel="ADD BRAND"
      storageKey="brands"
      type="brand"
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
          placeholder: "Enter brand name",
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