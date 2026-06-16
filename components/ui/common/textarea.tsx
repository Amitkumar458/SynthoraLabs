import { TextareaHTMLAttributes } from "react";
import { useField } from "formik";
import { cn } from "@/libs/utils";

type TextAreaFieldProps = {
  name: string;
  label?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
  rows?: number;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;

const baseClass = cn(
  "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400",
  "border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
  "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
);

const errorClass = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

export const TextAreaField = ({
  name,
  label,
  helperText,
  className,
  required,
  rows = 4,
  onChange,
  ...rest
}: TextAreaFieldProps) => {
  const [{ onChange: onFieldChange, ...field }, meta] = useField(name);

  const hasError = meta.touched && !!meta.error;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        {...field}
        {...rest}
        rows={rows}
        onChange={(e) => {
          onFieldChange(e);
          onChange?.(e);
        }}
        className={cn(
          baseClass,
          "resize-y min-h-[80px]",
          hasError && errorClass,
          className
        )}
      />

      {hasError ? (
        <p className="text-xs text-red-500">{meta.error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-400">{helperText}</p>
      ) : null}
    </div>
  );
};