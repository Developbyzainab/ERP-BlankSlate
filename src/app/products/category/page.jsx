"use client";

import MasterList from "@/src/components/master-data/MasterList";

export default function CategoryPage() {
  return (
    <MasterList
      title="Category"
      addLabel="ADD CATEGORY"
      storageKey="categories"
      type="category"
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
          key: "code",
          label: "CODE",
        },
        {
          key: "parentCategory",
          label: "PARENT CATEGORY",
        },
        {
          key: "description",
          label: "DESCRIPTION",
        },
      ]}
      fields={[
        {
          name: "name",
          label: "NAME",
          placeholder: "Enter name",
        },
        {
          name: "code",
          label: "CODE",
          placeholder: "Enter code",
        },
        {
          name: "parentCategory",
          label: "SELECT PARENT CATEGORY",
          placeholder: "Select parent category",
        },
        {
          name: "description",
          label: "DESCRIPTION",
          placeholder: "Enter description",
          type: "textarea",
        },
      ]}
    />
  );
}