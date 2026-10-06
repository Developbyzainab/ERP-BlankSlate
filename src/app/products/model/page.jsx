"use client";

import MasterList from "@/src/components/master-data/MasterList";

export default function ModelPage() {
  return (
    <MasterList
      title="Model"
      addLabel="ADD MODEL"
      storageKey="models"
      type="model"
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
          placeholder: "Enter model name",
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