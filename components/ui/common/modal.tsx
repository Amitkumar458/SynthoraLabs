import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/libs/utils";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";

const sizeMap: Record<ModalSize, string> = {
  xs:   "max-w-xs",
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-xl",
  "2xl":"max-w-2xl",
  "3xl":"max-w-3xl",
  "4xl":"max-w-4xl",
  "5xl":"max-w-5xl",
  full: "max-w-[90vw]",
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;

  // Footer actions
  onSubmit?: () => void;
  submitLabel?: string;
  isSubmitLoading?: boolean;
  isSubmitDisabled?: boolean;

  onCancel?: () => void;
  cancelLabel?: string;

  // Slot for extra footer buttons
  footerExtra?: ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  onSubmit,
  submitLabel = "Submit",
  isSubmitLoading = false,
  isSubmitDisabled = false,
  onCancel,
  cancelLabel = "Cancel",
  footerExtra,
}: ModalProps) {
  if (!open) return null;

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Dialog box */}
      <div
        className={cn(
          "relative w-full rounded-xl bg-white shadow-xl flex flex-col max-h-[90vh]",
          sizeMap[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 flex-shrink-0">
          {title && (
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-4 flex-1">
          {children}
        </div>

        {/* Footer — only renders if any action is passed */}
        {(onSubmit || onCancel || footerExtra) && (
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-6 py-4 flex-shrink-0">
            {footerExtra}

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                {cancelLabel}
              </button>
            )}

            {onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitDisabled || isSubmitLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {isSubmitLoading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {submitLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
