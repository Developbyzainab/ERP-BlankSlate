"use client";

import MasterList from "@/components/master-data/MasterList";

export default function VariantPage() {
  return (
    <MasterList
      title="Variant"
      addLabel="ADD VARIANT"
      storageKey="variants"
      type="variant"
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
          placeholder: "Enter variant name",
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