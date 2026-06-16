"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Mail,
  Sparkles,
  Send,
  X,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { TextInputField } from "@/components/ui/common/Input";
import { TextAreaField } from "@/components/ui/common/textarea";
import { PhoneInputField } from "@/components/ui/common/PhoneInputField";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { Button } from "../common/Button";
import { sendContactEmail } from "@/helpers/sendEmail";

// ─── Validation ───────────────────────────────────────────────────────────────

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  companyName: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  problemDescription: Yup.string()
    .required("Problem or requirement is required")
    .min(10, "Please provide at least 10 characters"),
  expectation: Yup.string()
    .required("Expectation is required")
    .min(10, "Please provide at least 10 characters"),
});

type ContactUsFormValues = Yup.InferType<typeof validationSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface ContactUsProps {
  open: boolean;
  onClose: () => void;
}

// ─── Info panel items ─────────────────────────────────────────────────────────

const INFO_ITEMS = [
  {
    icon: CheckCircle2,
    title: "Expert AI Solutions",
    desc: "Tailored agents built for your exact workflow.",
  },
  {
    icon: CheckCircle2,
    title: "Fast Turnaround",
    desc: "We respond within one business day.",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Support",
    desc: "From idea to deployment, we've got you covered.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactUs({ open, onClose }: ContactUsProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: ContactUsFormValues) => {
    setSubmitError(null);

    const result = await sendContactEmail({
      name: values.name,
      email: values.email,
      phone: values.phone,
      companyName: values.companyName,
      problemDescription: values.problemDescription,
      expectation: values.expectation,
    });

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } else {
      setSubmitError(result.message);
    }
  };

  if (!open) return null;

  return (
    /* ── Backdrop ─────────────────────────────────────────────────────────── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* ── Dialog shell ──────────────────────────────────────────────────── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl",
          "flex flex-col lg:flex-row overflow-hidden max-h-[92vh]",
          "animate-fadeUp",
        )}
      >
        {/* ── Close button (top-right, always visible) ───────────────────── */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={cn(
            "absolute right-4 top-4 z-20 rounded-full p-1.5 transition-all duration-150",
            "text-white/80 hover:text-white hover:bg-white/20",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
            "lg:text-white/70"
          )}
        >
          <X size={18} />
        </button>

        {/* ── Left info panel ────────────────────────────────────────────── */}
        <div
          className={cn(
            "relative flex flex-col justify-between overflow-hidden",
            "bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500",
            "px-6 py-8 lg:w-[38%] lg:py-10 lg:px-8",
            // On mobile: compact header strip
            "min-h-[160px] lg:min-h-0"
          )}
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-10 -left-10 size-52 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 size-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            {/* Badge */}
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Sparkles size={12} />
              SynthoraLabs
            </span>

            <h2 className="text-2xl font-bold text-white leading-tight lg:text-3xl">
              Let&apos;s Build
              <br />
              <span className="text-cyan-200">Something Great</span>
            </h2>
            <p className="mt-2 text-md text-white/80 leading-relaxed hidden lg:block">
              Tell us about your problem and we&apos;ll design an AI agent that
              solves it — fast.
            </p>
          </div>

          {/* Info checklist — only on desktop */}
          <ul className="relative z-10 mt-8 hidden lg:flex flex-col gap-4">
            {INFO_ITEMS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Icon size={14} className="text-white" />
                </span>
                <div>
                  <p className="text-md font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/80">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Contact info row — desktop bottom */}
          <div className="relative z-10 mt-8 hidden lg:flex flex-col gap-2">
            <a
              href="mailto:hello@synthoralabs.com"
              className="flex items-center gap-2 text-md text-white/80 hover:text-white transition-colors"
            >
              <Mail size={16} />
              hello@synthoralabs.ai
            </a>
            <span className="flex items-center gap-2 text-md text-white/80">
              <Phone size={16} />
              +91 80089 99212
            </span>
          </div>
        </div>

        {/* ── Right: Form ────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Scrollable form body */}
          <div
            className={cn(
              "flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7",
              // Thin scrollbar — Firefox
              "[scrollbar-width:thin] [scrollbar-color:rgba(129,140,248,0.5)_transparent]",
              // Thin scrollbar — Chrome / Safari
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-indigo-300/60",
              "[&::-webkit-scrollbar-thumb:hover]:bg-indigo-400/80"
            )}
          >
            {submitted ? (
              /* ── Success state ──────────────────────────────────────── */
              <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center animate-fadeUp">
                <div className="flex size-16 items-center justify-center rounded-full bg-indigo-50">
                  <CheckCircle2 className="size-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Message Sent!
                </h3>
                <p className="max-w-xs text-sm text-gray-500">
                  Thanks for reaching out. Our team will get back to you within
                  one business day.
                </p>
              </div>
            ) : (
              /* ── Formik form ────────────────────────────────────────── */
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  companyName: "",
                  problemDescription: "",
                  expectation: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id="contact-us-form" className="flex flex-col gap-4">
                    {/* Header row inside form */}
                    <div className="mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        Get in Touch
                      </h3>
                      <p className="text-sm text-gray-500">
                        Fill in the details below and we&apos;ll reach out
                        shortly.
                      </p>
                    </div>

                    {/* Row 1: Name + Email */}
                    <div
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      style={{ animation: "fadeUp 0.4s ease both 0ms" }}
                    >
                      <TextInputField
                        name="name"
                        label="Full Name"
                        placeholder="Jane Smith"
                        required
                      />
                      <TextInputField
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="jane@company.com"
                        required
                      />
                    </div>

                    {/* Row 2: Phone */}
                    <div style={{ animation: "fadeUp 0.4s ease both 60ms" }}>
                      <PhoneInputField
                        name="phone"
                        label="Phone Number"
                        placeholder="98765 43210"
                        defaultCountryCode="IN"
                        required
                      />
                    </div>

                    {/* Row 3: Company */}
                    <div style={{ animation: "fadeUp 0.4s ease both 120ms" }}>
                      <TextInputField
                        name="companyName"
                        label="Company Name"
                        placeholder="Acme Corp"
                        required
                      />
                    </div>

                    {/* Row 4: Problem */}
                    <div style={{ animation: "fadeUp 0.4s ease both 180ms" }}>
                      <TextAreaField
                        name="problemDescription"
                        label="Your Problem or Requirement"
                        rows={3}
                        placeholder="Describe what you're trying to solve…"
                        required
                      />
                    </div>

                    {/* Row 5: Expectation */}
                    <div style={{ animation: "fadeUp 0.4s ease both 240ms" }}>
                      <TextAreaField
                        name="expectation"
                        label="What Do You Expect from the AI Agent?"
                        rows={3}
                        placeholder="E.g. automate lead follow-ups, summarise reports daily…"
                        required
                      />
                    </div>

                    {/* ── Footer ────────────────────────────────────────── */}
                    <div
                      className="flex flex-col gap-3 border-t border-gray-100 pt-4"
                      style={{ animation: "fadeUp 0.4s ease both 280ms" }}
                    >
                      {/* Error banner */}
                      {submitError && (
                        <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600 text-center">
                          {submitError}
                        </p>
                      )}

                      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
                        <Button
                          type="button"
                          onClick={onClose}
                          variant={"outline"}
                          className={cn(
                            "border-gray-200 px-4 py-2 text-sm font-medium text-gray-700",
                          )}
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn("cursor-pointer text-sm gap-2")}
                        >
                          {isSubmitting ? (
                            <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          ) : (
                            <Send size={15} />
                          )}
                          {isSubmitting ? "Sending…" : "Send Message"}
                        </Button>
                      </div>
                    </div>

                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
