import { useEffect, useRef, useState } from "react";

import { formatLeadMessage, mapModalTitleToFormType } from "@/lib/lead-message";
import { openWhatsAppChat } from "@/lib/whatsapp";

export interface LeadFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const empty: LeadFormValues = { name: "", email: "", phone: "", message: "" };

export function LeadModal({
  open,
  onClose,
  title = "Get Your Free Media Plan",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  const [values, setValues] = useState<LeadFormValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormValues, string>>>({});
  const [sent, setSent] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setErrors({});
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstField.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (k: keyof LeadFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value.slice(0, 1000) }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof LeadFormValues, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email.";
    if (values.phone.trim().length < 6) next.phone = "Enter a contact number.";
    if (!values.message.trim()) next.message = "Tell us a little about your goals.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const trimmed = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
    };

    openWhatsAppChat(
      formatLeadMessage(mapModalTitleToFormType(title), {
        Name: trimmed.name,
        Email: trimmed.email,
        Phone: trimmed.phone,
        Message: trimmed.message,
      }),
    );
    setSent(true);
    setValues(empty);
  };

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-charcoal outline-none transition focus:border-green focus:ring-2 focus:ring-green/25";

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm animate-in fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative w-full max-w-lg rounded-t-3xl bg-card p-7 shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:rounded-3xl"
      >
        <p className="eyebrow">Free media plan</p>
        <h2 id="lead-modal-title" className="mt-2 text-2xl font-bold">
          {title}
        </h2>

        {sent ? (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Thanks — your request is in. A strategist will come back to you within one business
              day with a first-pass channel plan.
            </p>
            <button onClick={onClose} className="btn-cta mt-6 w-full">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="lf-name" className="mb-1.5 block text-xs font-semibold text-navy">
                Name
              </label>
              <input
                id="lf-name"
                ref={firstField}
                className={field}
                value={values.name}
                onChange={set("name")}
                maxLength={100}
                autoComplete="name"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="lf-email" className="mb-1.5 block text-xs font-semibold text-navy">
                  Email
                </label>
                <input
                  id="lf-email"
                  type="email"
                  className={field}
                  value={values.email}
                  onChange={set("email")}
                  maxLength={255}
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="lf-phone" className="mb-1.5 block text-xs font-semibold text-navy">
                  Phone
                </label>
                <input
                  id="lf-phone"
                  type="tel"
                  className={field}
                  value={values.phone}
                  onChange={set("phone")}
                  maxLength={30}
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="lf-message" className="mb-1.5 block text-xs font-semibold text-navy">
                What are you trying to grow?
              </label>
              <textarea
                id="lf-message"
                rows={3}
                className={field}
                value={values.message}
                onChange={set("message")}
                maxLength={1000}
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
              <button type="button" onClick={onClose} className="btn-ghost">
                Cancel
              </button>
              <button type="submit" className="btn-cta">
                Send Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
