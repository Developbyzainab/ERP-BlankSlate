"use client";

import { useRef, useState } from "react";
import {
  Bold,
  Underline,
  Eraser,
  Type,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table2,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Maximize,
  Code2,
  HelpCircle,
  ChevronDown,
  Plus,
  X,
  Check,
} from "lucide-react";

/* =========================================================
   STYLES
========================================================= */

const inputClass =
  "h-[46px] w-full rounded-full border border-[#e5e8f0] bg-white px-[24px] text-[14px] text-[#485da0] outline-none placeholder:text-[#485da0] focus:border-[#cfd5e3]";

const selectClass =
  "h-[46px] w-full appearance-none rounded-full border border-[#e5e8f0] bg-white px-[24px] pr-[48px] text-[14px] text-[#485da0] outline-none focus:border-[#cfd5e3]";

const labelClass =
  "mb-[8px] flex min-h-[16px] items-center justify-between text-[13px] font-normal uppercase leading-[1.2] text-[#7d8cba]";

/* =========================================================
   NORMAL FIELD
========================================================= */

function Field({
  label,
  placeholder = "",
  required = false,
  type = "text",
}) {
  return (
    <div>
      <label className={labelClass}>
        <span>
          {label}
          {required && (
            <span className="ml-[3px]">*</span>
          )}
        </span>
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  required = false,
  newOption,
  onNewOption,
  children,
}) {
  return (
    <div>
      <label className={labelClass}>
        <span>
          {label}
          {required && (
            <span className="ml-[3px]">*</span>
          )}
        </span>

        {newOption && (
          <button
            type="button"
            onClick={onNewOption}
            className="flex items-center gap-[2px] text-[12px] font-medium uppercase text-[#48d98a] transition hover:text-[#27bd6c]"
          >
            NEW {newOption}

            <Plus
              size={15}
              strokeWidth={3}
            />
          </button>
        )}
      </label>

      <div className="relative">
        <select
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Select {label}
          </option>

          {children}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-[23px] top-1/2 -translate-y-1/2 text-[#8492bb]"
        />
      </div>
    </div>
  );
}

/* =========================================================
   TOOLBAR BUTTON
========================================================= */

function ToolbarButton({
  title,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) =>
        e.preventDefault()
      }
      onClick={onClick}
      className="flex h-[42px] min-w-[40px] items-center justify-center border-r border-[#e9edf4] bg-white px-[8px] text-[#7d8cba] transition hover:bg-[#f3f5f9]"
    >
      {children}
    </button>
  );
}

/* =========================================================
   NEW ITEM MODAL
========================================================= */

function NewItemModal({
  type,
  onClose,
  onAdd,
}) {
  const [name, setName] =
    useState("");

  const [code, setCode] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [parentCategory, setParentCategory] =
    useState("");

  const titleMap = {
    unit: "New Unit",
    brand: "New Brand",
    category: "New Category",
    subCategory: "New Sub Category",
    model: "New Model",
  };

  const title =
    titleMap[type] || "New Item";

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      code: code.trim(),
      description: description.trim(),
      parentCategory,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 px-4">

      <div className="w-full max-w-[470px] rounded-[14px] bg-white p-[28px] shadow-[0_15px_50px_rgba(50,60,100,0.18)]">

        {/* HEADER */}

        <div className="mb-[24px] flex items-center justify-between">

          <h2 className="text-[20px] font-medium text-[#485d9d]">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f1f3f7] text-[#7d8cba] transition hover:bg-[#e8ebf1]"
          >
            <X size={18} />
          </button>

        </div>

        <form
          onSubmit={handleAdd}
          className="flex flex-col gap-[17px]"
        >

          {/* NAME */}

          <div>
            <label className="mb-[7px] block text-[12px] uppercase text-[#7d8cba]">
              NAME
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Name"
              autoFocus
              className={inputClass}
            />
          </div>

          {/* CODE */}

          {(type === "category" ||
            type === "subCategory") && (
            <div>
              <label className="mb-[7px] block text-[12px] uppercase text-[#7d8cba]">
                CODE
              </label>

              <input
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                placeholder="Code"
                className={inputClass}
              />
            </div>
          )}

          {/* PARENT CATEGORY */}

          {type === "subCategory" && (
            <div>
              <label className="mb-[7px] block text-[12px] uppercase text-[#7d8cba]">
                SELECT PARENT CATEGORY
              </label>

              <div className="relative">
                <select
                  value={parentCategory}
                  onChange={(e) =>
                    setParentCategory(
                      e.target.value
                    )
                  }
                  className={selectClass}
                >
                  <option value="">
                    Select Parent Category
                  </option>

                  <option value="category-1">
                    Category 1
                  </option>

                  <option value="category-2">
                    Category 2
                  </option>
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-[23px] top-1/2 -translate-y-1/2 text-[#8492bb]"
                />
              </div>
            </div>
          )}

          {/* DESCRIPTION */}

          <div>
            <label className="mb-[7px] block text-[12px] uppercase text-[#7d8cba]">
              DESCRIPTION
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Description"
              rows={4}
              className="w-full resize-none rounded-[14px] border border-[#e5e8f0] bg-white px-[20px] py-[13px] text-[14px] text-[#485da0] outline-none placeholder:text-[#485da0] focus:border-[#cfd5e3]"
            />
          </div>

          {/* ADD */}

          <div className="mt-[3px] flex justify-end">

            <button
              type="submit"
              className="flex h-[42px] items-center justify-center rounded-full bg-gradient-to-r from-[#7b32ff] to-[#d43ac5] px-[28px] text-[13px] font-semibold text-white transition hover:opacity-90"
            >
              ADD
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AddProductPage() {
  const editorRef = useRef(null);
  const savedRange = useRef(null);

  const [image, setImage] =
    useState(null);

  const [customOptions, setCustomOptions] =
    useState({
      unit: [],
      brand: [],
      category: [],
      subCategory: [],
      model: [],
    });

  /* MODAL */

  const [modalType, setModalType] =
    useState(null);

  /* EDITOR POPUP */

  const [editorPopup, setEditorPopup] =
    useState(null);

  const [editorUrl, setEditorUrl] =
    useState("");

  /* =======================================================
     ADD NEW ITEM
  ======================================================= */

  const handleNewItem = (data) => {
    if (!modalType) return;

    setCustomOptions((previous) => ({
      ...previous,
      [modalType]: [
        ...previous[modalType],
        data.name,
      ],
    }));

    setModalType(null);
  };

  /* =======================================================
     SAVE EDITOR SELECTION
  ======================================================= */

  const saveSelection = () => {
    const selection =
      window.getSelection();

    if (
      selection &&
      selection.rangeCount > 0 &&
      editorRef.current &&
      editorRef.current.contains(
        selection.anchorNode
      )
    ) {
      savedRange.current =
        selection.getRangeAt(0).cloneRange();
    }
  };

  /* =======================================================
     RESTORE EDITOR SELECTION
  ======================================================= */

  const restoreSelection = () => {
    const selection =
      window.getSelection();

    if (
      savedRange.current &&
      selection
    ) {
      selection.removeAllRanges();

      selection.addRange(
        savedRange.current
      );
    }
  };

  /* =======================================================
     EDITOR COMMAND
  ======================================================= */

  const execCommand = (
    command,
    value = null
  ) => {
    editorRef.current?.focus();

    restoreSelection();

    document.execCommand(
      command,
      false,
      value
    );

    saveSelection();
  };

  /* =======================================================
     URL TOOL
  ======================================================= */

  const openUrlTool = (type) => {
    saveSelection();

    setEditorUrl("");

    setEditorPopup(type);
  };

  const applyUrlTool = () => {
    if (!editorUrl.trim()) return;

    editorRef.current?.focus();

    restoreSelection();

    if (editorPopup === "link") {
      document.execCommand(
        "createLink",
        false,
        editorUrl.trim()
      );
    }

    if (editorPopup === "image") {
      document.execCommand(
        "insertImage",
        false,
        editorUrl.trim()
      );
    }

    if (editorPopup === "video") {
      document.execCommand(
        "insertHTML",
        false,
        `
        <video
          controls
          src="${editorUrl.trim()}"
          style="max-width:100%;"
        ></video>
        <br/>
        `
      );
    }

    saveSelection();

    setEditorPopup(null);
    setEditorUrl("");
  };

  /* =======================================================
     TABLE
  ======================================================= */

  const insertTable = () => {
    editorRef.current?.focus();

    restoreSelection();

    const table = `
      <table
        style="
          border-collapse:collapse;
          width:100%;
          margin:8px 0;
        "
      >
        <tbody>

          <tr>
            <td style="border:1px solid #aeb5c2;padding:7px;">
              Cell
            </td>

            <td style="border:1px solid #aeb5c2;padding:7px;">
              Cell
            </td>

            <td style="border:1px solid #aeb5c2;padding:7px;">
              Cell
            </td>
          </tr>

          <tr>
            <td style="border:1px solid #aeb5c2;padding:7px;">
              Cell
            </td>

            <td style="border:1px solid #aeb5c2;padding:7px;">
              Cell
            </td>

            <td style="border:1px solid #aeb5c2;padding:7px;">
              Cell
            </td>
          </tr>

        </tbody>
      </table>

      <br/>
    `;

    document.execCommand(
      "insertHTML",
      false,
      table
    );

    saveSelection();
  };

  /* =======================================================
     IMAGE
  ======================================================= */

  const handleImage = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setImage(
      URL.createObjectURL(file)
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    // Connect your product API/database here.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0ff] via-[#eef4ff] to-[#f7eaff] px-[20px] py-[22px]">

      {/* =====================================================
          HEADING
      ====================================================== */}

      <h1 className="mb-[24px] px-[2px] text-[24px] font-medium text-[#455b99]">
        Add New Product
      </h1>

      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="rounded-[14px] bg-white px-[5%] py-[40px]"
      >

        <div className="grid grid-cols-1 gap-x-[28px] gap-y-[21px] md:grid-cols-2 xl:grid-cols-3">

          {/* =================================================
              COLUMN 1
          ================================================== */}

          <div className="flex flex-col gap-[18px]">

            <SelectField
              label="Product Type"
              required
            >
              <option value="single">
                Single
              </option>

              <option value="variable">
                Variable
              </option>
            </SelectField>

            <SelectField
              label="Unit"
              newOption="UNIT"
              onNewOption={() =>
                setModalType("unit")
              }
            >
              <option value="pcs">
                PCS
              </option>

              <option value="kg">
                KG
              </option>

              <option value="meter">
                Meter
              </option>

              {customOptions.unit.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </SelectField>

            <SelectField
              label="Category"
              newOption="CATEGORY"
              onNewOption={() =>
                setModalType("category")
              }
            >
              <option value="category1">
                Category 1
              </option>

              <option value="category2">
                Category 2
              </option>

              {customOptions.category.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </SelectField>

            <Field
              label="HSN"
              placeholder="HSN"
            />

            <Field
              label="Zip Length"
              placeholder="Zip Length"
            />

            <Field
              label="Fabrics"
              placeholder="Fabrics"
            />

            <Field
              label="Zipper"
              placeholder="Zipper"
            />

            <Field
              label="Purchase Price"
              placeholder="0"
              type="number"
            />

            <Field
              label="Price of Other Currency"
              placeholder="0"
              type="number"
            />

          </div>

          {/* =================================================
              COLUMN 2
          ================================================== */}

          <div className="flex flex-col gap-[18px]">

            <Field
              label="Product Name"
              placeholder="Product Name"
              required
            />

            <SelectField
              label="Barcode Type"
            >
              <option value="c39">
                C39 (Support for BarCode)
              </option>

              <option value="code128">
                Code 128
              </option>

              <option value="ean13">
                EAN-13
              </option>

              <option value="upc">
                UPC
              </option>
            </SelectField>

            <SelectField
              label="Sub Category"
              newOption="SUB CATEGORY"
              onNewOption={() =>
                setModalType(
                  "subCategory"
                )
              }
            >
              <option value="sub1">
                Sub Category 1
              </option>

              <option value="sub2">
                Sub Category 2
              </option>

              {customOptions.subCategory.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </SelectField>

            <Field
              label="Length"
              placeholder="Length"
            />

            <Field
              label="Flap Length"
              placeholder="Flap Length"
            />

            <Field
              label="Front Sheet"
              placeholder="Front Sheet"
            />

            <Field
              label="Alert Quantity"
              placeholder=""
              type="number"
            />

            <Field
              label="Selling Price"
              placeholder="0"
              type="number"
              required
            />

            <Field
              label="Tax"
              placeholder="0"
              type="number"
            />

          </div>

          {/* =================================================
              COLUMN 3
          ================================================== */}

          <div className="flex flex-col gap-[18px]">

            <Field
              label="Product SKU"
              placeholder=""
            />

            <SelectField
              label="Brand"
              newOption="BRAND"
              onNewOption={() =>
                setModalType("brand")
              }
            >
              <option value="brand1">
                Brand 1
              </option>

              <option value="brand2">
                Brand 2
              </option>

              {customOptions.brand.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </SelectField>

            <SelectField
              label="Model"
              newOption="MODEL"
              onNewOption={() =>
                setModalType("model")
              }
            >
              <option value="model1">
                Model 1
              </option>

              <option value="model2">
                Model 2
              </option>

              {customOptions.model.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </SelectField>

            <Field
              label="Height"
              placeholder="Height"
            />

            <Field
              label="Stitches"
              placeholder="Stitches"
            />

            <Field
              label="Wall"
              placeholder="Wall"
            />

            {/* PRODUCT IMAGE */}

            <div>

              <label className={labelClass}>
                PRODUCT IMAGE
              </label>

              <label className="flex h-[46px] w-full cursor-pointer items-center justify-between rounded-full border border-[#e5e8f0] bg-white pl-[24px] pr-[6px]">

                <span className="text-[14px] text-[#485da0]">
                  {image
                    ? "Image Selected"
                    : "BROWSE FILE"}
                </span>

                <span className="flex h-[35px] min-w-[105px] items-center justify-center rounded-full bg-gradient-to-r from-[#7b32ff] to-[#d43ac5] text-[13px] font-semibold text-white">
                  BROWSE
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImage
                  }
                  className="hidden"
                />

              </label>

              {image && (
                <img
                  src={image}
                  alt="Product preview"
                  className="mt-[7px] h-[65px] w-[85px] rounded-lg object-contain"
                />
              )}

            </div>

            <Field
              label="Min. Selling Price"
              placeholder="0"
              type="number"
            />

            {/* TAX TYPE */}

            <div>

              <label className="mb-[8px] block text-[13px] font-normal uppercase leading-[1.3] text-[#7d8cba]">
                TAX
                <br />
                TYPE
              </label>

              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[#e5e8f0] text-[16px] text-[#485da0]">
                %
              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <div className="mt-[40px]">

          <label className="mb-[8px] block text-[13px] font-normal uppercase text-[#7d8cba]">
            DESCRIPTION
          </label>

          <div className="relative overflow-hidden rounded-[5px] border border-[#dfe3eb]">

            {/* URL POPUP */}

            {editorPopup && (
              <div className="absolute left-[8px] top-[50px] z-20 flex items-center gap-[6px] rounded-[7px] border border-[#e1e5ed] bg-white p-[7px] shadow-lg">

                <input
                  autoFocus
                  value={editorUrl}
                  onChange={(e) =>
                    setEditorUrl(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter"
                    ) {
                      applyUrlTool();
                    }

                    if (
                      e.key === "Escape"
                    ) {
                      setEditorPopup(
                        null
                      );
                    }
                  }}
                  placeholder={
                    editorPopup ===
                    "link"
                      ? "Enter link URL"
                      : editorPopup ===
                        "image"
                      ? "Enter image URL"
                      : "Enter video URL"
                  }
                  className="h-[34px] w-[240px] rounded-full border border-[#e0e4ed] px-[13px] text-[12px] text-[#485da0] outline-none"
                />

                <button
                  type="button"
                  onClick={
                    applyUrlTool
                  }
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#48d98a] text-white"
                >
                  <Check size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditorPopup(
                      null
                    )
                  }
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#eef1f6] text-[#7d8cba]"
                >
                  <X size={16} />
                </button>

              </div>
            )}

            {/* TOOLBAR */}

            <div className="flex min-h-[46px] items-center overflow-x-auto bg-[#f5f7fb] px-[5px]">

              <ToolbarButton
                title="Bold"
                onClick={() =>
                  execCommand("bold")
                }
              >
                <Bold
                  size={20}
                  strokeWidth={2.5}
                />
              </ToolbarButton>

              <ToolbarButton
                title="Underline"
                onClick={() =>
                  execCommand(
                    "underline"
                  )
                }
              >
                <Underline
                  size={20}
                  strokeWidth={2.5}
                />
              </ToolbarButton>

              <ToolbarButton
                title="Clear formatting"
                onClick={() =>
                  execCommand(
                    "removeFormat"
                  )
                }
              >
                <Eraser size={19} />
              </ToolbarButton>

              <ToolbarButton
                title="Font"
                onClick={() =>
                  execCommand(
                    "fontName",
                    "Poppins"
                  )
                }
              >
                <div className="flex items-center gap-[2px] text-[14px]">
                  Poppins
                  <ChevronDown
                    size={12}
                  />
                </div>
              </ToolbarButton>

              <ToolbarButton
                title="Font size"
                onClick={() =>
                  execCommand(
                    "fontSize",
                    "4"
                  )
                }
              >
                <div className="flex items-center gap-[2px]">
                  <Type size={20} />
                  <ChevronDown
                    size={11}
                  />
                </div>
              </ToolbarButton>

              <ToolbarButton
                title="Bullet list"
                onClick={() =>
                  execCommand(
                    "insertUnorderedList"
                  )
                }
              >
                <List size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Numbered list"
                onClick={() =>
                  execCommand(
                    "insertOrderedList"
                  )
                }
              >
                <ListOrdered size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Align left"
                onClick={() =>
                  execCommand(
                    "justifyLeft"
                  )
                }
              >
                <AlignLeft size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Align center"
                onClick={() =>
                  execCommand(
                    "justifyCenter"
                  )
                }
              >
                <AlignCenter size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Align right"
                onClick={() =>
                  execCommand(
                    "justifyRight"
                  )
                }
              >
                <AlignRight size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Insert table"
                onClick={
                  insertTable
                }
              >
                <Table2 size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Insert link"
                onClick={() =>
                  openUrlTool("link")
                }
              >
                <LinkIcon size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Insert image"
                onClick={() =>
                  openUrlTool("image")
                }
              >
                <ImageIcon size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Insert video"
                onClick={() =>
                  openUrlTool("video")
                }
              >
                <Video size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Fullscreen"
                onClick={() => {
                  if (
                    document.fullscreenElement
                  ) {
                    document.exitFullscreen();
                  } else {
                    editorRef.current?.requestFullscreen();
                  }
                }}
              >
                <Maximize size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Code"
                onClick={() =>
                  execCommand(
                    "formatBlock",
                    "pre"
                  )
                }
              >
                <Code2 size={20} />
              </ToolbarButton>

              <ToolbarButton
                title="Paragraph"
                onClick={() =>
                  execCommand(
                    "formatBlock",
                    "p"
                  )
                }
              >
                <HelpCircle size={20} />
              </ToolbarButton>

            </div>

            {/* EDITOR */}

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onMouseUp={
                saveSelection
              }
              onKeyUp={
                saveSelection
              }
              onInput={
                saveSelection
              }
              onBlur={
                saveSelection
              }
              className="min-h-[200px] w-full bg-white px-[13px] py-[11px] text-[14px] leading-[1.5] text-[#485da0] outline-none"
            />

          </div>
        </div>

        {/* ===================================================
            ADD PRODUCT
        ==================================================== */}

        <div className="mt-[28px] flex justify-end">

          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-[#7b32ff] to-[#d43ac5] px-[27px] py-[10px] text-[13px] font-semibold text-white transition hover:opacity-90"
          >
            ADD PRODUCT
          </button>

        </div>

      </form>

      {/* =====================================================
          NEW ITEM MODAL
      ====================================================== */}

      {modalType && (
        <NewItemModal
          type={modalType}
          onClose={() =>
            setModalType(null)
          }
          onAdd={handleNewItem}
        />
      )}

    </div>
  );
}