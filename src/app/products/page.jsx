"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Printer,
  Upload,
  Download,
  Columns3,
  Plus,
  ImageOff,
} from "lucide-react";

export default function ProductList() {
  const [activeTab, setActiveTab] = useState("products");
  const [openAction, setOpenAction] = useState(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const [products] = useState([]);
  const [comboProducts] = useState([]);

  const data = activeTab === "products" ? products : comboProducts;

  return (
    <div
      className="
        min-h-screen
        px-4 pt-4 pb-10
        text-[#40559d]
        bg-[radial-gradient(circle_at_90%_15%,rgba(255,225,250,0.65),transparent_25%),radial-gradient(circle_at_100%_80%,rgba(180,245,255,0.45),transparent_25%),linear-gradient(120deg,#e4efff_0%,#e7edff_45%,#f2edff_75%,#e6faff_100%)]
      "
    >
      {/* PAGE TITLE */}
      <h1 className="m-0 mb-6 text-[21px] leading-none font-medium text-[#40559d]">
        Product List
      </h1>

      {/* TABS */}
      <div className="ml-8 mb-4 flex gap-3 max-md:ml-0">
        <button
          className={`
            h-[48px] w-[145px]
            border-none
            text-[13px] font-medium
            cursor-pointer
            transition-all duration-200
            max-md:w-[125px] max-md:text-[12px]
            ${
              activeTab === "products"
                ? "bg-white text-[#40559d]"
                : "bg-[#cbd6f4] text-[#40559d] hover:bg-white"
            }
          `}
          onClick={() => {
            setActiveTab("products");
            setOpenAction(null);
          }}
        >
          PRODUCTS
        </button>

        <button
          className={`
            h-[48px] w-[145px]
            border-none
            text-[13px] font-medium
            cursor-pointer
            transition-all duration-200
            max-md:w-[125px] max-md:text-[12px]
            ${
              activeTab === "combo"
                ? "bg-white text-[#40559d]"
                : "bg-[#cbd6f4] text-[#40559d] hover:bg-white"
            }
          `}
          onClick={() => {
            setActiveTab("combo");
            setOpenAction(null);
          }}
        >
          COMBO PRODUCT
        </button>
      </div>

      {/* MAIN CARD */}
      <div
        className="
          w-full min-h-[430px]
          rounded-[12px]
          bg-white
          px-8 pt-7 pb-5
          shadow-[0_2px_8px_rgba(90,90,150,0.03)]
          max-md:px-4 max-md:py-5
        "
      >
        {/* TOOLBAR */}
        <div
          className="
            mb-10
            flex items-center justify-between
            max-xl:flex-wrap
            max-xl:gap-5
          "
        >
          {/* LEFT */}
          <div className="flex items-center gap-3 max-md:flex-wrap">
            {/* LIMIT */}
            <div
              className="
                relative
                flex h-[52px] w-[120px]
                items-center justify-between
                rounded-[30px]
                border border-[#e2e5f2]
                px-5
                text-[#40559d]
              "
            >
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="
                  h-full w-full
                  appearance-none
                  border-none
                  bg-transparent
                  text-[14px]
                  text-[#40559d]
                  outline-none
                  cursor-pointer
                "
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute right-4
                  text-[#7d8bb9]
                "
              />
            </div>

            {/* NEW PRODUCT */}
           <Link
  href="/products/add"
  className="
    flex h-[40px]
    items-center
    gap-2
    rounded-[25px]
    border-none
    bg-[linear-gradient(100deg,#7c2cff,#cf32d5)]
    px-5
    text-[13px]
    font-semibold
    tracking-[0.3px]
    text-white
    cursor-pointer
    transition-opacity
    duration-200
    hover:opacity-[0.93]
  "
>
  <Plus size={19} strokeWidth={2} />
  NEW PRODUCT
</Link>
          </div>

          {/* SEARCH */}
          <div
            className="
              w-[245px]
              max-xl:order-3
              max-xl:w-[245px]
            "
          >
            <div
              className="
                flex h-[50px]
                items-center
                gap-3
                border-b
                border-[#9ba8ca]
                text-[#40559d]
              "
            >
              <Search
                size={23}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <input
                type="text"
                placeholder="SEARCH"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  h-full
                  w-full
                  border-none
                  bg-transparent
                  text-[13px]
                  font-medium
                  text-[#40559d]
                  outline-none
                  placeholder:text-[#40559d]
                  placeholder:opacity-100
                "
              />
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div
            className="
              flex
              h-[40px]
              overflow-hidden
              rounded-[23px]
              border
              border-[#723cff]
              max-md:ml-auto
            "
          >
            <ToolbarButton title="Print">
              <Printer size={18} />
            </ToolbarButton>

            <ToolbarButton title="Upload">
              <Upload size={18} />
            </ToolbarButton>

            <ToolbarButton title="Download">
              <Download size={18} />
            </ToolbarButton>

            <ToolbarButton title="Columns" last>
              <Columns3 size={18} />
            </ToolbarButton>
          </div>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-auto">
          {activeTab === "products" ? (
            <ProductTable
              data={data}
              openAction={openAction}
              setOpenAction={setOpenAction}
            />
          ) : (
            <ComboProductTable
              data={comboProducts}
              openAction={openAction}
              setOpenAction={setOpenAction}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   TOOLBAR BUTTON
========================= */

function ToolbarButton({ children, title, last }) {
  return (
    <button
      title={title}
      className={`
        flex
        h-full
        w-[45px]
        items-center
        justify-center
        border-none
        bg-white
        text-[#40559d]
        cursor-pointer
        hover:bg-[#f7f3ff]
        ${!last ? "border-r border-[#723cff]" : ""}
      `}
    >
      {children}
    </button>
  );
}

/* =========================
   PRODUCT TABLE
========================= */

function ProductTable({
  data,
  openAction,
  setOpenAction,
}) {
  return (
    <table className="w-full min-w-[850px] border-collapse">
      <thead>
        <tr className="border-b border-[#d5d9e6]">
          <TableHeader>SL</TableHeader>
          <TableHeader>IMAGE</TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>BRAND</TableHeader>
          <TableHeader>SELLING PRICE</TableHeader>
          <TableHeader>STOCK</TableHeader>
          <TableHeader>STOCK ALERT</TableHeader>
          <TableHeader>ACTION</TableHeader>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <EmptyState
            colSpan={8}
            text="No products added yet"
          />
        ) : (
          data.map((product, index) => (
            <ProductRow
              key={product.id || index}
              product={product}
              index={index}
              openAction={openAction}
              setOpenAction={setOpenAction}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

/* =========================
   COMBO TABLE
========================= */

function ComboProductTable({
  data,
  openAction,
  setOpenAction,
}) {
  return (
    <table className="w-full min-w-[720px] border-collapse">
      <thead>
        <tr className="border-b border-[#d5d9e6]">
          <TableHeader combo>SL</TableHeader>
          <TableHeader combo>IMAGE</TableHeader>
          <TableHeader combo>NAME</TableHeader>
          <TableHeader combo>REGULAR PRICE</TableHeader>
          <TableHeader combo>ENABLE</TableHeader>
          <TableHeader combo>ACTION</TableHeader>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <EmptyState
            colSpan={6}
            text="No combo products added yet"
          />
        ) : (
          data.map((product, index) => (
            <tr
              key={product.id || index}
              className="
                h-[78px]
                border-b
                border-[#e1e3ed]
              "
            >
              <td className="px-5 py-3 text-[14px] text-[#7f8db9]">
                {index + 1}
              </td>

              <td className="px-5 py-3">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      h-[38px]
                      w-[38px]
                      rounded
                      object-cover
                    "
                  />
                ) : (
                  <ImageOff
                    size={34}
                    className="text-[#9aa5c5]"
                  />
                )}
              </td>

              <td className="px-5 py-3 text-[14px] text-[#7f8db9]">
                {product.name}
              </td>

              <td className="px-5 py-3 text-[14px] text-[#7f8db9]">
                {product.regularPrice}
              </td>

              <td className="px-5 py-3">
                <label className="relative inline-block h-[21px] w-[40px]">
                  <input
                    type="checkbox"
                    checked={product.enabled}
                    readOnly
                    className="peer h-0 w-0 opacity-0"
                  />

                  <span
                    className="
                      absolute
                      inset-0
                      cursor-pointer
                      rounded-[30px]
                      bg-[#d8dceb]
                      transition-all
                      duration-200
                      before:absolute
                      before:left-[2px]
                      before:top-[2px]
                      before:h-[17px]
                      before:w-[17px]
                      before:rounded-full
                      before:bg-white
                      before:shadow-[0_1px_4px_rgba(0,0,0,0.15)]
                      before:transition-all
                      peer-checked:bg-[#8b39ff]
                      peer-checked:before:translate-x-[19px]
                    "
                  />
                </label>
              </td>

              <ActionCell
                index={index}
                openAction={openAction}
                setOpenAction={setOpenAction}
              />
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

/* =========================
   PRODUCT ROW
========================= */

function ProductRow({
  product,
  index,
  openAction,
  setOpenAction,
}) {
  return (
    <tr
      className="
        h-[78px]
        border-b
        border-[#e1e3ed]
      "
    >
      <td className="px-4 py-3 text-[14px] text-[#7f8db9]">
        {index + 1}
      </td>

      <td className="px-4 py-3">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="
              h-[38px]
              w-[38px]
              rounded
              object-cover
            "
          />
        ) : (
          <ImageOff
            size={34}
            className="text-[#9aa5c5]"
          />
        )}
      </td>

      <td className="px-4 py-3 text-[14px] text-[#7f8db9]">
        {product.name}
      </td>

      <td className="px-4 py-3 text-[14px] text-[#7f8db9]">
        {product.brand}
      </td>

      <td className="px-4 py-3 text-[14px] text-[#7f8db9]">
        {product.sellingPrice}
      </td>

      <td className="px-4 py-3 text-[14px] text-[#7f8db9]">
        {product.stock}
      </td>

      <td className="px-4 py-3 text-[14px] text-[#7f8db9]">
        {product.stockAlert}
      </td>

      <ActionCell
        index={index}
        openAction={openAction}
        setOpenAction={setOpenAction}
      />
    </tr>
  );
}

/* =========================
   TABLE HEADER
========================= */

function TableHeader({ children, combo }) {
  return (
    <th
      className={`
        h-[42px]
        whitespace-nowrap
        text-left
        text-[13px]
        font-medium
        text-[#40559d]
        ${combo ? "px-5" : "px-4"}
      `}
    >
      <span className="mr-[2px] text-[17px] font-normal">
        ↓
      </span>

      {children}
    </th>
  );
}

/* =========================
   ACTION CELL
========================= */

function ActionCell({
  index,
  openAction,
  setOpenAction,
}) {
  const isOpen = openAction === index;

  return (
    <td
      className="
        relative
        min-w-[155px]
        px-4
        py-3
      "
    >
      <button
        className={`
          flex
          h-[40px]
          w-[140px]
          items-center
          justify-center
          gap-2
          rounded-[23px]
          border
          text-[13px]
          font-semibold
          cursor-pointer
          ${
            isOpen
              ? "border-transparent bg-[linear-gradient(100deg,#7b2cff,#c735d8)] text-white"
              : "border-[#7934ff] bg-white text-[#40559d]"
          }
        `}
        onClick={() =>
          setOpenAction(
            isOpen ? null : index
          )
        }
      >
        SELECT

        {isOpen ? (
          <ChevronUp size={17} />
        ) : (
          <ChevronDown size={17} />
        )}
      </button>

      {isOpen && <ActionMenu />}
    </td>
  );
}

/* =========================
   ACTION MENU
========================= */

function ActionMenu() {
  return (
    <div
      className="
        absolute
        right-2
        top-[55px]
        z-[50]
        min-h-[190px]
        w-[225px]
        rounded-[12px]
        bg-white
        py-3
        shadow-[0_15px_35px_rgba(108,67,210,0.18),0_5px_15px_rgba(108,67,210,0.08)]
      "
    >
      <ActionMenuButton>
        EDIT
      </ActionMenuButton>

      <ActionMenuButton>
        VIEW
      </ActionMenuButton>

      <ActionMenuButton>
        DELETE
      </ActionMenuButton>

      <ActionMenuButton>
        SELLING PRICE HISTORY
      </ActionMenuButton>
    </div>
  );
}

function ActionMenuButton({ children }) {
  return (
    <button
      className="
        h-[38px]
        w-full
        border-none
        bg-transparent
        text-[13px]
        text-[#7d8ab5]
        text-center
        cursor-pointer
        hover:bg-[#f7f4ff]
        hover:text-[#40559d]
      "
    >
      {children}
    </button>
  );
}

/* =========================
   EMPTY STATE
========================= */

function EmptyState({
  colSpan,
  text,
}) {
  return (
    <tr className="h-[140px]">
      <td
        colSpan={colSpan}
        className="text-center"
      >
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-2
            text-[#9aa5c5]
          "
        >
          <ImageOff size={34} />

          <p className="m-0 text-[13px]">
            {text}
          </p>
        </div>
      </td>
    </tr>
  );
}