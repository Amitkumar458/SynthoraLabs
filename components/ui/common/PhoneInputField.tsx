"use client";
import {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useField, useFormikContext } from "formik";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/libs/utils";
import { COUNTRIES, Country } from "@/constents/countryCodes";

// ─── Props ────────────────────────────────────────────────────────────────────

interface PhoneInputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  /** Formik field name — stores the full value e.g. "+91 9876543210" */
  name: string;
  /** Optional separate Formik field name for just the dial code */
  dialCodeName?: string;
  label?: string;
  helperText?: string;
  /** ISO 3166-1 alpha-2 country code to pre-select, defaults to "IN" */
  defaultCountryCode?: string;
}

// ─── Dropdown rect type ───────────────────────────────────────────────────────

interface DropdownRect {
  top: number;
  left: number;
  width: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PhoneInputField = ({
  name,
  dialCodeName,
  label,
  helperText,
  className,
  defaultCountryCode = "IN",
  ...props
}: PhoneInputFieldProps) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [, meta] = useField(name);

  const defaultCountry =
    COUNTRIES.find((c) => c.code === defaultCountryCode) ??
    COUNTRIES.find((c) => c.code === "IN")!;

  const [selected, setSelected] = useState<Country>(defaultCountry);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dropdownRect, setDropdownRect] = useState<DropdownRect | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasError = meta.touched && !!meta.error;

  // ── Sync into Formik ────────────────────────────────────────────────────────
  useEffect(() => {
    const combined = phoneNumber ? `${selected.dialCode} ${phoneNumber}` : "";
    setFieldValue(name, combined);
    if (dialCodeName) setFieldValue(dialCodeName, selected.dialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, phoneNumber]);

  // ── Open: compute position from trigger ────────────────────────────────────
  const openDropdown = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownRect({
        top: rect.bottom + 6,
        left: rect.left,
        // Dropdown is wider than the trigger; clamp to viewport right edge
        width: Math.min(288, window.innerWidth - rect.left - 8),
      });
    }
    setOpen(true);
  };

  // ── Reposition on scroll / resize while open ───────────────────────────────
  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownRect({
          top: rect.bottom + 6,
          left: rect.left,
          width: Math.min(288, window.innerWidth - rect.left - 8),
        });
      }
    };
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  // ── Close on outside click ──────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
      setSearch("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // ── Keyboard: Escape closes ────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // ── Focus search when dropdown opens ───────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search)
  );

  // ── Dropdown JSX (rendered into a portal) ──────────────────────────────────
  const dropdown =
    open && dropdownRect
      ? createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Select country"
            style={{
              position: "fixed",
              top: dropdownRect.top,
              left: dropdownRect.left,
              width: dropdownRect.width,
              zIndex: 9999,
            }}
            className={cn(
              "rounded-xl border border-gray-200 bg-white",
              "shadow-xl shadow-indigo-100/50 ring-1 ring-black/5",
              "animate-in fade-in-0 slide-in-from-top-1 duration-150"
            )}
          >
            {/* Search bar */}
            <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5">
              <Search className="size-3.5 shrink-0 text-indigo-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code…"
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Country list */}
            <ul
              className={cn(
                "max-h-56 overflow-y-auto py-1.5 space-y-0.5 px-1.5",
                "[scrollbar-width:thin] [scrollbar-color:rgba(129,140,248,0.5)_transparent]",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&::-webkit-scrollbar-thumb]:bg-indigo-300/60",
                "[&::-webkit-scrollbar-thumb:hover]:bg-indigo-400/80"
              )}
            >
              {filtered.length === 0 ? (
                <li className="px-3 py-3 text-md text-gray-400 text-center">
                  No country found
                </li>
              ) : (
                filtered.map((country) => {
                  const isActive = selected.code === country.code;
                  return (
                    <li key={country.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          setSelected(country);
                          setOpen(false);
                          setSearch("");
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors duration-100",
                          "hover:bg-indigo-50 hover:text-indigo-700",
                          isActive
                            ? "bg-indigo-50 text-indigo-700 font-semibold"
                            : "text-gray-700"
                        )}
                      >
                        <span className="text-lg leading-none select-none">
                          {country.flag}
                        </span>
                        <span className="flex-1 text-left truncate">
                          {country.name}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 tabular-nums text-xs",
                            isActive ? "text-indigo-500" : "text-gray-400"
                          )}
                        >
                          {country.dialCode}
                        </span>
                        {isActive && (
                          <span className="size-1.5 shrink-0 rounded-full bg-indigo-500" />
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={`${name}-input`}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
          {props.required && (
            <span className="ml-0.5 text-red-500">*</span>
          )}
        </label>
      )}

      {/* ── Input row ───────────────────────────────────────────────────────── */}
      <div ref={wrapperRef} className="relative">
        <div
          className={cn(
            "flex items-center w-full rounded-lg border bg-white transition-all duration-150",
            "border-gray-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20",
            hasError &&
              "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
            props.disabled && "cursor-not-allowed bg-gray-50 opacity-60"
          )}
        >
          {/* Country selector button */}
          <button
            ref={triggerRef}
            type="button"
            id={`${name}-country-trigger`}
            disabled={props.disabled}
            onClick={() => (open ? setOpen(false) : openDropdown())}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Select country code, currently ${selected.name} (${selected.dialCode})`}
            className={cn(
              "flex shrink-0 items-center gap-1.5 self-stretch",
              "border-r border-gray-200 pl-3 pr-2.5",
              "rounded-l-lg text-sm font-medium text-gray-700",
              "transition-colors duration-150 hover:bg-indigo-50",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/40",
              open && "bg-indigo-50",
              props.disabled && "pointer-events-none"
            )}
          >
            <span className="text-xl leading-none select-none pr-1">
              {selected.flag}
            </span>
            <span className="text-sm pt-1/2 tabular-nums text-gray-500 font-semibold">
              {selected.dialCode}
            </span>
            <ChevronDown
              className={cn(
                "size-3.5 text-gray-400 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>

          {/* Phone number input */}
          <input
            id={`${name}-input`}
            type="tel"
            value={phoneNumber}
            placeholder={props.placeholder ?? "Phone number"}
            disabled={props.disabled}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d\s\-()+]/g, "");
              setPhoneNumber(val);
            }}
            onBlur={() => setFieldTouched(name, true)}
            className={cn(
              "flex-1 min-w-0 rounded-r-lg bg-transparent px-3 py-2 text-sm text-gray-900",
              "outline-none placeholder:text-gray-400",
              "[appearance:textfield]",
              "[&::-webkit-outer-spin-button]:appearance-none",
              "[&::-webkit-inner-spin-button]:appearance-none",
              "disabled:cursor-not-allowed",
              className
            )}
          />
        </div>
      </div>

      {/* Portal dropdown — renders directly into document.body */}
      {dropdown}

      {/* Error / helper text */}
      {hasError ? (
        <p className="text-xs text-red-500">{meta.error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-400">{helperText}</p>
      ) : null}
    </div>
  );
};
