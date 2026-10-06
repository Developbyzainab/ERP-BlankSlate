"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import MasterList from "@/src/components/master-data/MasterList";

export default function ServicePage() {
  return (
    <MasterList
      title="Service"
      showAddButton={false}
      storageKey="services"
      type="service"
      customAddButton={
        <Link
          href="/products/add-product"
          className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#40559d] px-5 text-[13px] font-semibold text-white transition hover:bg-[#334887]"
        >
          <Plus size={17} />
          ADD PRODUCT
        </Link>
      }
      columns={[
        {
          key: "sl",
          label: "SL",
        },
        {
          key: "image",
          label: "IMAGE",
        },
        {
          key: "name",
          label: "NAME",
        },
        {
          key: "sku",
          label: "SKU",
        },
        {
          key: "hourlyRate",
          label: "HOURLY RATE",
        },
      ]}
      fields={[
        {
          name: "name",
          label: "NAME",
          placeholder: "Enter service name",
        },
        {
          name: "sku",
          label: "SKU",
          placeholder: "Enter SKU",
        },
        {
          name: "hourlyRate",
          label: "HOURLY RATE",
          placeholder: "Enter hourly rate",
          type: "number",
        },
      ]}
    />
  );
}