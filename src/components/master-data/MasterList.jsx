"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Printer,
  Upload,
  Download,
  Columns3,
  Plus,
  X,
  Pencil,
  Trash2,
  ImageOff,
} from "lucide-react";

export default function MasterList({
  title,
  addLabel = "ADD",
  storageKey,
  columns = [],
  fields = [],
  type = "master",
  showAddButton = true,
  customAddButton = null,
}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [limitOpen, setLimitOpen] = useState(false);
  const [limitSearch, setLimitSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({});

  const [actionOpen, setActionOpen] = useState(null);

  const [columnsOpen, setColumnsOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((column) => column.key)
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`erp-dost-${storageKey}`);

      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      setItems([]);
    }
  }, [storageKey]);

  function saveItems(nextItems) {
    setItems(nextItems);

    localStorage.setItem(
      `erp-dost-${storageKey}`,
      JSON.stringify(nextItems)
    );
  }

  function openAdd() {
    const initialForm = {};

    fields.forEach((field) => {
      initialForm[field.name] = "";
    });

    setForm(initialForm);
    setEditingItem(null);
    setModalOpen(true);
  }

  function openEdit(item) {
    const nextForm = {};

    fields.forEach((field) => {
      nextForm[field.name] = item[field.name] || "";
    });

    setForm(nextForm);
    setEditingItem(item);
    setModalOpen(true);
    setActionOpen(null);
  }

  function deleteItem(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    saveItems(items.filter((item) => item.id !== id));
    setActionOpen(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const hasEmptyRequired = fields.some(
      (field) =>
        field.required !== false &&
        !String(form[field.name] || "").trim()
    );

    if (hasEmptyRequired) {
      return;
    }

    if (editingItem) {
      const updated = items.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              ...form,
            }
          : item
      );

      saveItems(updated);
    } else {
      const newItem = {
        id: `${type}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        ...form,
        status: "Active",
        createdAt: new Date().toISOString(),
      };

      saveItems([...items, newItem]);
    }

    setModalOpen(false);
    setEditingItem(null);
    setForm({});
  }

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return items.slice(0, limit);
    }

    return items
      .filter((item) =>
        Object.values(item).some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query)
        )
      )
      .slice(0, limit);
  }, [items, search, limit]);

  const filteredLimits = [10, 25, 50, 100].filter((value) =>
    String(value).includes(limitSearch)
  );

  function toggleColumn(key) {
    setVisibleColumns((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  function renderCell(item, column, index) {
    if (column.key === "sl") {
      return index + 1;
    }

    if (column.key === "image") {
      return item.image ? (
        <img
          src={item.image}
          alt={item.name || "Image"}
          className="h-11 w-11 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5f6fb]">
          <ImageOff size={20} className="text-[#a6afc5]" />
        </div>
      );
    }

    if (column.key === "status") {
      return (
        <span
          className={`inline-flex min-w-[72px] items-center justify-center rounded-full px-3 py-1.5 text-[12px] font-semibold ${
            item.status === "Inactive"
              ? "bg-red-50 text-red-500"
              : "bg-green-50 text-green-600"
          }`}
        >
          {item.status || "Active"}
        </span>
      );
    }

    return item[column.key] || "-";
  }

  return (
    <div className="min-h-screen bg-[#eef2ff] px-5 pb-10 pt-5 text-[#40559d] md:px-7 lg:px-8">
      {/* PAGE TITLE */}
      <h1 className="mb-6 text-[22px] font-medium text-[#40559d]">
        {title}
      </h1>

      {/* MAIN CARD */}
      <div className="rounded-xl bg-white px-6 py-6 shadow-[0_3px_15px_rgba(80,88,140,0.06)] md:px-7">
        {/* TOOLBAR */}
        <div className="mb-7 flex flex-wrap items-center gap-3">
          {/* PAGE SIZE */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLimitOpen((value) => !value)}
              className="flex h-10 min-w-[100px] cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#d9deec] bg-white px-4 text-[13px] font-medium text-[#68779f] transition hover:border-[#aeb8d2]"
            >
              {limit}
              {limitOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {limitOpen && (
              <div className="absolute left-0 top-[46px] z-50 w-[180px] rounded-lg border border-[#e0e4ef] bg-white p-2 shadow-[0_10px_30px_rgba(60,70,120,0.15)]">
                <div className="mb-2 flex items-center gap-2 rounded-md border border-[#e0e4ef] px-2">
                  <Search size={15} className="text-[#9ba5bf]" />

                  <input
                    value={limitSearch}
                    onChange={(e) => setLimitSearch(e.target.value)}
                    placeholder="Search"
                    className="h-9 w-full border-none bg-transparent text-[13px] outline-none"
                  />
                </div>

                {filteredLimits.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setLimit(value);
                      setLimitOpen(false);
                      setLimitSearch("");
                    }}
                    className="flex h-9 w-full cursor-pointer items-center rounded-md px-3 text-left text-[13px] text-[#68779f] hover:bg-[#f3f5ff]"
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ADD BUTTON */}
          {customAddButton
            ? customAddButton
            : showAddButton && (
                <button
                  type="button"
                  onClick={openAdd}
                  className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#40559d] px-5 text-[13px] font-semibold text-white transition hover:bg-[#334887]"
                >
                  <Plus size={17} />
                  {addLabel}
                </button>
              )}

          {/* SEARCH */}
          <div className="ml-auto flex h-10 w-full max-w-[270px] items-center gap-2 rounded-lg border border-[#d9deec] bg-white px-3">
            <Search size={18} className="text-[#9aa5bf]" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-full w-full border-none bg-transparent text-[13px] text-[#52638e] outline-none placeholder:text-[#a2abc0]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="cursor-pointer text-[#9aa5bf] hover:text-[#40559d]"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* TOOLBAR ICONS */}
          <div className="flex h-10 overflow-hidden rounded-lg border border-[#40559d]">
            <ToolbarButton
              title="Print"
              onClick={() => window.print()}
            >
              <Printer size={18} />
            </ToolbarButton>

            <ToolbarButton
              title="Download"
              onClick={() => {
                const blob = new Blob(
                  [JSON.stringify(items, null, 2)],
                  { type: "application/json" }
                );

                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");

                a.href = url;
                a.download = `${storageKey}.json`;
                a.click();

                URL.revokeObjectURL(url);
              }}
            >
              <Download size={18} />
            </ToolbarButton>

            <label
              title="Upload JSON"
              className="flex h-10 w-11 cursor-pointer items-center justify-center border-r border-[#40559d] bg-white text-[#40559d] hover:bg-[#f5f3ff]"
            >
              <Upload size={18} />

              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const reader = new FileReader();

                  reader.onload = () => {
                    try {
                      const imported = JSON.parse(reader.result);

                      if (Array.isArray(imported)) {
                        saveItems(imported);
                      }
                    } catch {
                      // Invalid JSON is ignored.
                    }
                  };

                  reader.readAsText(file);
                  e.target.value = "";
                }}
              />
            </label>

            <div className="relative">
              <button
                type="button"
                title="Columns"
                onClick={() =>
                  setColumnsOpen((value) => !value)
                }
                className="flex h-10 w-11 cursor-pointer items-center justify-center bg-white text-[#40559d] hover:bg-[#f5f3ff]"
              >
                <Columns3 size={18} />
              </button>

              {columnsOpen && (
                <div className="absolute right-0 top-[46px] z-50 w-[210px] rounded-lg border border-[#e0e4ef] bg-white p-3 shadow-[0_10px_30px_rgba(60,70,120,0.15)]">
                  <p className="mb-2 text-[12px] font-semibold text-[#7180a3]">
                    SHOW COLUMNS
                  </p>

                  {columns.map((column) => (
                    <label
                      key={column.key}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-[12px] text-[#65749b] hover:bg-[#f5f6ff]"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(column.key)}
                        onChange={() =>
                          toggleColumn(column.key)
                        }
                        className="cursor-pointer"
                      />

                      {column.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="border-b border-[#d9ddea]">
                {columns
                  .filter((column) =>
                    visibleColumns.includes(column.key)
                  )
                  .map((column) => (
                    <th
                      key={column.key}
                      className="h-12 whitespace-nowrap px-4 text-left text-[13px] font-semibold text-[#40559d]"
                    >
                      <span className="mr-1 text-[15px]">
                        ↓
                      </span>

                      {column.label}
                    </th>
                  ))}

                <th className="h-12 px-4 text-left text-[13px] font-semibold text-[#40559d]">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      visibleColumns.length + 1
                    }
                    className="h-[220px] text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 text-[#a0aac1]">
                      <ImageOff size={38} />

                      <p className="m-0 text-[14px]">
                        No {title.toLowerCase()} added yet
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e7e9f1] transition hover:bg-[#fafbff]"
                  >
                    {columns
                      .filter((column) =>
                        visibleColumns.includes(
                          column.key
                        )
                      )
                      .map((column) => (
                        <td
                          key={column.key}
                          className="px-4 py-4 text-[13px] text-[#7180a3]"
                        >
                          {renderCell(
                            item,
                            column,
                            index
                          )}
                        </td>
                      ))}

                    <td className="relative px-4 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          setActionOpen(
                            actionOpen === item.id
                              ? null
                              : item.id
                          )
                        }
                        className="flex h-10 min-w-[125px] cursor-pointer items-center justify-center gap-2 rounded-full border border-[#d7dceb] bg-white px-4 text-[12px] font-semibold text-[#66759d] hover:border-[#40559d] hover:text-[#40559d]"
                      >
                        SELECT

                        {actionOpen === item.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {actionOpen === item.id && (
                        <div className="absolute right-4 top-[62px] z-40 w-[190px] rounded-xl bg-white py-2 shadow-[0_12px_35px_rgba(70,80,130,0.18)]">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            className="flex h-11 w-full cursor-pointer items-center gap-3 px-4 text-left text-[13px] text-[#68779f] hover:bg-[#f5f6ff]"
                          >
                            <Pencil size={16} />
                            EDIT
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteItem(item.id)
                            }
                            className="flex h-11 w-full cursor-pointer items-center gap-3 px-4 text-left text-[13px] text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            DELETE
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      {modalOpen && (
        <FormModal
          title={
            editingItem
              ? `EDIT ${title.toUpperCase()}`
              : addLabel
          }
          fields={fields}
          form={form}
          updateField={updateField}
          onClose={() => {
            setModalOpen(false);
            setEditingItem(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

/* =========================================================
   TOOLBAR BUTTON
========================================================= */

function ToolbarButton({ children, title, onClick }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex h-10 w-11 cursor-pointer items-center justify-center border-r border-[#40559d] bg-white text-[#40559d] transition hover:bg-[#f5f3ff] last:border-r-0"
    >
      {children}
    </button>
  );
}

/* =========================================================
   FORM MODAL
========================================================= */

function FormModal({
  title,
  fields,
  form,
  updateField,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#20284a]/30 px-4">
      <div className="w-full max-w-[620px] rounded-xl bg-white shadow-[0_20px_60px_rgba(40,50,100,0.2)]">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-[#e5e7ef] px-6 py-5">
          <h2 className="text-[18px] font-semibold text-[#40559d]">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#8d98b3] hover:bg-[#f3f4f9] hover:text-[#40559d]"
          >
            <X size={19} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="px-6 py-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={
                  field.fullWidth
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label className="mb-2 block text-[12px] font-semibold text-[#65749a]">
                  {field.label}

                  {field.required !== false && (
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    value={form[field.name] || ""}
                    onChange={(e) =>
                      updateField(
                        field.name,
                        e.target.value
                      )
                    }
                    placeholder={field.placeholder || ""}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-[#d9deea] bg-white px-3.5 py-3 text-[13px] text-[#52638d] outline-none transition placeholder:text-[#a5aec2] focus:border-[#40559d]"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={form[field.name] || ""}
                    onChange={(e) =>
                      updateField(
                        field.name,
                        e.target.value
                      )
                    }
                    className="h-11 w-full cursor-pointer rounded-lg border border-[#d9deea] bg-white px-3.5 text-[13px] text-[#52638d] outline-none focus:border-[#40559d]"
                  >
                    <option value="">
                      {field.placeholder ||
                        "Select"}
                    </option>

                    {(field.options || []).map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={form[field.name] || ""}
                    onChange={(e) =>
                      updateField(
                        field.name,
                        e.target.value
                      )
                    }
                    placeholder={field.placeholder || ""}
                    className="h-11 w-full rounded-lg border border-[#d9deea] bg-white px-3.5 text-[13px] text-[#52638d] outline-none transition placeholder:text-[#a5aec2] focus:border-[#40559d]"
                  />
                )}
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-7 flex justify-end gap-3 border-t border-[#e7e9ef] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="h-11 cursor-pointer rounded-lg border border-[#d9deea] px-5 text-[13px] font-semibold text-[#68779d] hover:bg-[#f5f6fa]"
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="h-11 cursor-pointer rounded-lg bg-[#40559d] px-6 text-[13px] font-semibold text-white hover:bg-[#334887]"
            >
              {title.startsWith("EDIT")
                ? "UPDATE"
                : "ADD"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}