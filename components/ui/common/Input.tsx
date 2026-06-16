import { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { cn } from "@/libs/utils";

interface TextInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label?: string;
  helperText?: string;
}

export const TextInputField = ({
  name,
  label,
  helperText,
  className,
  onChange,
  ...props
}: TextInputFieldProps) => {
  const [{ onChange: onFieldChange, ...field }, meta] = useField(name);

  const hasError = meta.touched && !!meta.error;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
          {props.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        {...field}
        {...props}
        onChange={(e) => {
          onFieldChange(e);
          onChange?.(e);
        }}
        className={cn(
          // Base
          "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400",
          // Number — hide spinners
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          // Default border + focus
          "border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
          // Error state
          hasError && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          // Disabled state
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          className
        )}
      />

      {/* Error or helper text */}
      {hasError ? (
        <p className="text-xs text-red-500">{meta.error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-400">{helperText}</p>
      ) : null}
    </div>
  );
};