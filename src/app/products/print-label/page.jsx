"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Check,
  Trash2,
  Plus,
  Barcode,
} from "lucide-react";

export default function PrintLabelPage() {
  const [products, setProducts] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const [labelRows, setLabelRows] = useState([]);

  const [showProductName, setShowProductName] = useState(true);
  const [showVariation, setShowVariation] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showBusinessName, setShowBusinessName] = useState(true);

  const [productNameFontSize, setProductNameFontSize] = useState("12");
  const [variationFontSize, setVariationFontSize] = useState("12");
  const [priceFontSize, setPriceFontSize] = useState("12");
  const [businessNameFontSize, setBusinessNameFontSize] =
    useState("12");

  const [taxMode, setTaxMode] = useState("Excluding Tax");

  const [sheetType, setSheetType] = useState(
    "20 Labels per Sheet, Sheet Size: 8.5\" x 11\", Label Size: 4\" x 1\", Labels per sheet: 20"
  );

  const [barcodeWidth, setBarcodeWidth] = useState("1");
  const [barcodeHeight, setBarcodeHeight] = useState("0.2");

  const [businessName, setBusinessName] = useState("");

  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

  useEffect(() => {
    const possibleKeys = [
      "erp-dost-products",
      "products",
      "erp-products",
    ];

    let loadedProducts = [];

    for (const key of possibleKeys) {
      try {
        const saved = localStorage.getItem(key);

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed) && parsed.length) {
            loadedProducts = parsed;
            break;
          }
        }
      } catch {
        // Ignore invalid localStorage data.
      }
    }

    setProducts(loadedProducts);

    /* Business name from possible saved settings */
    try {
      const savedBusinessName =
        localStorage.getItem("businessName");

      if (savedBusinessName) {
        setBusinessName(savedBusinessName);
      }

      const settings = localStorage.getItem(
        "erp-dost-settings"
      );

      if (settings) {
        const parsedSettings = JSON.parse(settings);

        if (
          parsedSettings?.businessName &&
          !savedBusinessName
        ) {
          setBusinessName(parsedSettings.businessName);
        }
      }
    } catch {
      // Ignore settings errors.
    }
  }, []);

  /* =========================================================
     PRODUCT HELPERS
  ========================================================= */

  function getProductName(product) {
    return (
      product?.name ||
      product?.productName ||
      product?.product_name ||
      product?.title ||
      ""
    );
  }

  function getBrand(product) {
    return (
      product?.brand ||
      product?.brandName ||
      product?.brand_name ||
      ""
    );
  }

  function getModel(product) {
    return (
      product?.model ||
      product?.modelName ||
      product?.model_name ||
      ""
    );
  }

  function getSku(product) {
    return (
      product?.sku ||
      product?.SKU ||
      product?.productSku ||
      ""
    );
  }

  function getVariation(product) {
    return (
      product?.variation ||
      product?.variant ||
      product?.variantName ||
      product?.variationName ||
      ""
    );
  }

  function getPrice(product) {
    return (
      product?.price ??
      product?.sellingPrice ??
      product?.salePrice ??
      product?.selling_price ??
      ""
    );
  }

  function getProductId(product) {
    return (
      product?.id ||
      product?._id ||
      product?.productId ||
      getProductName(product)
    );
  }

  /* =========================================================
     UNIQUE BRAND / MODEL
  ========================================================= */

  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => getBrand(product))
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const models = useMemo(() => {
    const filtered = selectedBrand
      ? products.filter(
          (product) =>
            getBrand(product) === selectedBrand
        )
      : products;

    return [
      ...new Set(
        filtered
          .map((product) => getModel(product))
          .filter(Boolean)
      ),
    ];
  }, [products, selectedBrand]);

  const availableProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        !selectedBrand ||
        getBrand(product) === selectedBrand;

      const modelMatch =
        !selectedModel ||
        getModel(product) === selectedModel;

      return brandMatch && modelMatch;
    });
  }, [products, selectedBrand, selectedModel]);

  /* =========================================================
     BRAND CHANGE
  ========================================================= */

  function handleBrandChange(value) {
    setSelectedBrand(value);
    setSelectedModel("");
    setSelectedProduct("");
  }

  /* =========================================================
     MODEL CHANGE
  ========================================================= */

  function handleModelChange(value) {
    setSelectedModel(value);
    setSelectedProduct("");
  }

  /* =========================================================
     ADD PRODUCT
  ========================================================= */

  function handleProductChange(value) {
    setSelectedProduct(value);

    if (!value) return;

    const product = products.find(
      (item) =>
        String(getProductId(item)) === String(value)
    );

    if (!product) return;

    const productId = String(getProductId(product));

    const alreadyAdded = labelRows.some(
      (row) => String(row.id) === productId
    );

    if (alreadyAdded) return;

    setLabelRows((current) => [
      ...current,
      {
        id: productId,
        product,
        quantity: 1,
      },
    ]);
  }

  /* =========================================================
     QUANTITY
  ========================================================= */

  function updateQuantity(id, value) {
    const quantity = Math.max(
      1,
      Number(value) || 1
    );

    setLabelRows((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              quantity,
            }
          : row
      )
    );
  }

  /* =========================================================
     REMOVE
  ========================================================= */

  function removeProduct(id) {
    setLabelRows((current) =>
      current.filter((row) => row.id !== id)
    );
  }

  /* =========================================================
     GENERATE
  ========================================================= */

  function generateLabels() {
    if (!labelRows.length) {
      return;
    }

    const labels = [];

    labelRows.forEach((row) => {
      const quantity = Math.max(
        1,
        Number(row.quantity) || 1
      );

      for (let i = 0; i < quantity; i++) {
        labels.push(row.product);
      }
    });

    openPrintWindow(labels);
  }

  /* =========================================================
     PRINT WINDOW
  ========================================================= */

  function openPrintWindow(labelProducts) {
    const printWindow = window.open(
      "",
      "_blank",
      "width=1100,height=800"
    );

    if (!printWindow) return;

    const labelsHtml = labelProducts
      .map((product) => {
        const name = escapeHtml(
          getProductName(product)
        );

        const variation = escapeHtml(
          getVariation(product)
        );

        const sku = escapeHtml(
          getSku(product)
        );

        const price = escapeHtml(
          formatPrice(getPrice(product))
        );

        const barcodeText = sku || name || "000000";

        return `
          <div class="label">
            ${
              showBusinessName && businessName
                ? `<div class="business-name" style="font-size:${businessNameFontSize}px">
                    ${escapeHtml(businessName)}
                  </div>`
                : ""
            }

            ${
              showProductName
                ? `<div class="product-name" style="font-size:${productNameFontSize}px">
                    ${name}
                  </div>`
                : ""
            }

            ${
              showVariation && variation
                ? `<div class="variation" style="font-size:${variationFontSize}px">
                    ${variation}
                  </div>`
                : ""
            }

            ${
              showPrice
                ? `<div class="price" style="font-size:${priceFontSize}px">
                    ${price}
                  </div>`
                : ""
            }

            <div class="barcode-area">
              <div class="barcode">
                ${createBarcodeBars(barcodeText)}
              </div>

              <div class="barcode-number">
                ${barcodeText}
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Labels</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 0;
              background: white;
              font-family: Arial, sans-serif;
            }

            .sheet {
              display: grid;
              grid-template-columns: repeat(2, 4in);
              gap: 0;
              width: 8.5in;
              margin: 0 auto;
            }

            .label {
              width: 4in;
              height: 1in;
              padding: 0.08in 0.12in;
              overflow: hidden;
              border: 0.3px solid #ddd;
              position: relative;
              text-align: center;
            }

            .business-name {
              font-weight: 600;
              line-height: 1.1;
            }

            .product-name {
              font-weight: 600;
              line-height: 1.1;
            }

            .variation {
              line-height: 1.1;
            }

            .price {
              line-height: 1.1;
              font-weight: 600;
            }

            .barcode-area {
              margin-top: 2px;
            }

            .barcode {
              height: ${Math.max(
                20,
                Number(barcodeHeight) * 96
              )}px;

              width: ${Math.max(
                80,
                Number(barcodeWidth) * 96
              )}px;

              max-width: 100%;
              margin: 0 auto;

              display: flex;
              align-items: stretch;
              justify-content: center;
              overflow: hidden;
            }

            .barcode span {
              display: block;
              height: 100%;
            }

            .barcode-number {
              font-size: 7px;
              line-height: 8px;
              margin-top: 1px;
            }

            @page {
              size: letter;
              margin: 0.25in;
            }

            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }

              .label {
                border: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="sheet">
            ${labelsHtml}
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eaf0ff] px-5 pb-10 pt-2 md:px-6 lg:px-7">
      {/* DECORATIVE BACKGROUND */}
      <div className="pointer-events-none absolute -left-20 top-[300px] h-[270px] w-[270px] rounded-full bg-[#d8e5ff] opacity-80 blur-[2px]" />

      <div className="pointer-events-none absolute -right-20 top-[400px] h-[300px] w-[300px] rounded-full bg-[#e6d5ff] opacity-80 blur-[2px]" />

      <div className="pointer-events-none absolute bottom-[-100px] left-[-80px] h-[240px] w-[240px] rounded-full bg-[#d8e5ff] opacity-70" />

      {/* PAGE TITLE */}
      <h1 className="relative z-10 mb-5 text-[18px] font-medium text-[#40559d]">
        Print Label
      </h1>

      {/* MAIN CARD */}
      <section className="relative z-10 rounded-xl bg-white px-7 py-8 shadow-[0_3px_18px_rgba(67,83,145,0.05)] md:px-10 md:py-10">
        {/* =====================================================
            SELECT PRODUCT
        ===================================================== */}

        <SectionTitle>Select Product</SectionTitle>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_340px_minmax(0,1fr)]">
          <SelectField
            label="SELECT BRAND"
            value={selectedBrand}
            onChange={(e) =>
              handleBrandChange(e.target.value)
            }
            placeholder="Select Brand"
            options={brands.map((brand) => ({
              value: brand,
              label: brand,
            }))}
          />

          <SelectField
            label="SELECT MODEL"
            value={selectedModel}
            onChange={(e) =>
              handleModelChange(e.target.value)
            }
            placeholder="Select Model"
            options={models.map((model) => ({
              value: model,
              label: model,
            }))}
          />

          <SelectField
            label="SELECT PRODUCT * [ SELECT BRAND OR MODEL FOR LOAD PRODUCT LIST ]"
            value={selectedProduct}
            onChange={(e) =>
              handleProductChange(e.target.value)
            }
            placeholder="Choose Product"
            options={availableProducts.map(
              (product) => ({
                value: String(
                  getProductId(product)
                ),
                label:
                  getProductName(product) ||
                  "Unnamed Product",
              })
            )}
          />
        </div>

        {/* =====================================================
            PRODUCT TABLE
        ===================================================== */}

        <div className="mt-4 overflow-hidden border border-[#dfe4ef]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="h-[65px] border-r border-[#dfe4ef] px-3 text-left text-[13px] font-semibold text-[#40559d]">
                  Product
                </th>

                <th className="h-[65px] border-r border-[#dfe4ef] px-3 text-left text-[13px] font-semibold text-[#40559d]">
                  SKU
                </th>

                <th className="h-[65px] border-r border-[#dfe4ef] px-3 text-left text-[13px] font-semibold text-[#40559d]">
                  No of Label
                </th>

                <th className="h-[65px] px-3 text-left text-[13px] font-semibold text-[#40559d]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {labelRows.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="h-[58px] text-center text-[12px] text-[#9aa4bd]"
                  >
                    Select a product to add it here
                  </td>
                </tr>
              ) : (
                labelRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-[#dfe4ef]"
                  >
                    <td className="px-3 py-3 text-[13px] text-[#65749e]">
                      {getProductName(row.product) ||
                        "-"}
                    </td>

                    <td className="border-l border-[#dfe4ef] px-3 py-3 text-[13px] text-[#65749e]">
                      {getSku(row.product) || "-"}
                    </td>

                    <td className="border-l border-[#dfe4ef] px-3 py-3">
                      <input
                        type="number"
                        min="1"
                        value={row.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            row.id,
                            e.target.value
                          )
                        }
                        className="h-9 w-[120px] rounded-md border border-[#dfe4ef] px-3 text-[13px] text-[#65749e] outline-none focus:border-[#40559d]"
                      />
                    </td>

                    <td className="border-l border-[#dfe4ef] px-3 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          removeProduct(row.id)
                        }
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-red-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* =====================================================
            INFO TO SHOW IN LABEL
        ===================================================== */}

        <SectionTitle className="mt-5">
          Info to Show in Label
        </SectionTitle>

        <div className="grid grid-cols-1 gap-x-7 gap-y-5 xl:grid-cols-4">
          <LabelOption
            checked={showProductName}
            onChange={setShowProductName}
            label="Product Name"
          />

          <LabelOption
            checked={showVariation}
            onChange={setShowVariation}
            label="Product Variation (Recommended)"
          />

          <LabelOption
            checked={showPrice}
            onChange={setShowPrice}
            label="Price"
          />

          <div className="flex items-center gap-7">
            <LabelOption
              checked={showBusinessName}
              onChange={setShowBusinessName}
              label="Business Name"
            />
          </div>
        </div>

        {/* TAX DROPDOWN */}
        <div className="mt-[-46px] mb-3 hidden xl:flex xl:justify-end">
          <SmallSelect
            value={taxMode}
            onChange={(e) =>
              setTaxMode(e.target.value)
            }
            options={[
              {
                value: "Excluding Tax",
                label: "Excluding Tax",
              },
              {
                value: "Including Tax",
                label: "Including Tax",
              },
            ]}
          />
        </div>

        {/* FONT SIZE ROW */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <InputField
            label="PRODUCT NAME FONT SIZE *"
            value={productNameFontSize}
            onChange={(e) =>
              setProductNameFontSize(e.target.value)
            }
            type="number"
          />

          <InputField
            label="VARIANT FONT SIZE *"
            value={variationFontSize}
            onChange={(e) =>
              setVariationFontSize(e.target.value)
            }
            type="number"
          />

          <InputField
            label="PRICE FONT SIZE *"
            value={priceFontSize}
            onChange={(e) =>
              setPriceFontSize(e.target.value)
            }
            type="number"
          />

          <InputField
            label="BUSINESS NAME FONT SIZE *"
            value={businessNameFontSize}
            onChange={(e) =>
              setBusinessNameFontSize(e.target.value)
            }
            type="number"
          />
        </div>

        {/* TAX MOBILE/TABLET */}
        <div className="mt-5 xl:hidden">
          <SmallSelect
            value={taxMode}
            onChange={(e) =>
              setTaxMode(e.target.value)
            }
            options={[
              {
                value: "Excluding Tax",
                label: "Excluding Tax",
              },
              {
                value: "Including Tax",
                label: "Including Tax",
              },
            ]}
          />
        </div>

        {/* =====================================================
            BARCODE SETTINGS
        ===================================================== */}

        <SectionTitle className="mt-5">
          Barcode Settings
        </SectionTitle>

        <SelectFull
          value={sheetType}
          onChange={(e) =>
            setSheetType(e.target.value)
          }
          options={[
            {
              value:
                '20 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 4" x 1", Labels per sheet: 20',
              label:
                '20 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 4" x 1", Labels per sheet: 20',
            },
            {
              value:
                '30 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 2.5" x 1", Labels per sheet: 30',
              label:
                '30 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 2.5" x 1", Labels per sheet: 30',
            },
            {
              value:
                '40 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 2" x 1", Labels per sheet: 40',
              label:
                '40 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 2" x 1", Labels per sheet: 40',
            },
          ]}
        />

        {/* =====================================================
            BARCODE SIZE
        ===================================================== */}

        <div className="mt-6 flex items-center gap-3">
          <SectionTitle className="m-0">
            Barcode Size
          </SectionTitle>

          <Barcode
            size={50}
            strokeWidth={1.6}
            className="text-black"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <InputField
            label="MAX WIDTH : INCHES *"
            value={barcodeWidth}
            onChange={(e) =>
              setBarcodeWidth(e.target.value)
            }
            type="number"
            step="0.1"
          />

          <InputField
            label="HEIGHT : INCHES *"
            value={barcodeHeight}
            onChange={(e) =>
              setBarcodeHeight(e.target.value)
            }
            type="number"
            step="0.1"
          />
        </div>

        {/* =====================================================
            GENERATE
        ===================================================== */}

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={generateLabels}
            disabled={labelRows.length === 0}
            className={`flex h-[50px] cursor-pointer items-center gap-2 rounded-md px-6 text-[13px] font-semibold text-white shadow-sm transition ${
              labelRows.length === 0
                ? "cursor-not-allowed bg-[#b8a5d5]"
                : "bg-gradient-to-r from-[#8534ff] to-[#ca35d4] hover:opacity-90"
            }`}
          >
            <Check size={17} />
            GENERATE
          </button>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  children,
  className = "",
}) {
  return (
    <h2
      className={`text-[18px] font-medium text-[#40559d] ${className}`}
    >
      {children}
    </h2>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-medium text-[#8290b5]">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="h-[46px] w-full cursor-pointer appearance-none rounded-full border border-[#e1e5ef] bg-white px-5 pr-11 text-[13px] text-[#596b9f] outline-none transition focus:border-[#b4bdd2]"
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#8491b3]"
        />
      </div>
    </div>
  );
}

/* =========================================================
   FULL SELECT
========================================================= */

function SelectFull({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="h-[46px] w-full cursor-pointer appearance-none rounded-full border border-[#e1e5ef] bg-white px-5 pr-12 text-[13px] text-[#6675a1] outline-none focus:border-[#b4bdd2]"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#8491b3]"
      />
    </div>
  );
}

/* =========================================================
   SMALL SELECT
========================================================= */

function SmallSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative w-[152px]">
      <select
        value={value}
        onChange={onChange}
        className="h-[45px] w-full cursor-pointer appearance-none rounded-full border border-[#e1e5ef] bg-white px-5 pr-10 text-[12px] text-[#6878a5] outline-none focus:border-[#b4bdd2]"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8290b2]"
      />
    </div>
  );
}

/* =========================================================
   LABEL OPTION
========================================================= */

function LabelOption({
  checked,
  onChange,
  label,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[13px] text-[#52649b]">
      <span
        className={`flex h-[19px] w-[19px] items-center justify-center rounded-md transition ${
          checked
            ? "bg-gradient-to-br from-[#8635ff] to-[#bd38df] text-white shadow-[0_3px_8px_rgba(144,55,240,0.25)]"
            : "border border-[#d8ddec] bg-white"
        }`}
      >
        {checked && <Check size={13} strokeWidth={3} />}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
        className="sr-only"
      />

      {label}
    </label>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  value,
  onChange,
  type = "text",
  step,
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-medium text-[#8290b5]">
        {label}
      </label>

      <input
        type={type}
        step={step}
        min={type === "number" ? "0" : undefined}
        value={value}
        onChange={onChange}
        className="h-[46px] w-full rounded-full border border-[#e1e5ef] bg-white px-5 text-[13px] text-[#596b9f] outline-none transition focus:border-[#b4bdd2]"
      />
    </div>
  );
}

/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(value) {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return number.toLocaleString();
}

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   SIMPLE BARCODE
========================================================= */

function createBarcodeBars(text) {
  const source = String(text || "000000");

  let pattern = "";

  for (let i = 0; i < source.length; i++) {
    const code = source.charCodeAt(i);

    pattern +=
      (code % 2 === 0 ? "110" : "100") +
      (code % 3 === 0 ? "10" : "1") +
      (code % 5 === 0 ? "111" : "101");
  }

  pattern =
    "101101" +
    pattern +
    "110101";

  return pattern
    .split("")
    .map(
      (bit) =>
        `<span style="width:${bit === "1" ? "2px" : "1px"};background:#111;margin-right:1px"></span>`
    )
    .join("");
}