"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type Status = "idle" | "submitting" | "success" | "error";

export default function OrderForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.forms.order;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        setStatus("error");
        setErrorMessage(t.errorGeneric);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(t.errorGeneric);
    }
  }

  if (status === "success") {
    return <p className="border border-line bg-sand p-6 font-sans text-graphite">{t.success}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 font-sans">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.name} name="name" required />
        <Field label={t.phone} name="phone" type="tel" required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.preferredContact} name="preferredContact" placeholder={t.preferredContactPlaceholder} />
        <Field label={t.product} name="product" placeholder={t.productPlaceholder} required />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label={t.color} name="color" />
        <Field label={t.size} name="size" />
        <Field label={t.quantity} name="quantity" type="number" min={1} />
      </div>
      <Field label={t.deliveryLocation} name="deliveryLocation" required />
      <TextArea label={t.comment} name="comment" />
      <Consent name="consent" locale={locale} text={t.consentText} linkText={t.consentLinkText} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex w-fit items-center justify-center bg-bordeaux px-6 py-3 font-sans text-sm text-cream hover:bg-cocoa disabled:opacity-60"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>

      {status === "error" && errorMessage && (
        <p className="font-sans text-sm text-bordeaux">{errorMessage}</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
}) {
  return (
    <label className="block text-sm text-graphite">
      <span className="mb-1 block">
        {label}
        {required && <span className="text-bordeaux"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        className="w-full border border-line bg-cream px-3 py-2 text-graphite outline-none focus:border-bordeaux"
      />
    </label>
  );
}

function TextArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block text-sm text-graphite">
      <span className="mb-1 block">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="w-full border border-line bg-cream px-3 py-2 text-graphite outline-none focus:border-bordeaux"
      />
    </label>
  );
}

function Consent({
  name,
  locale,
  text,
  linkText,
}: {
  name: string;
  locale: Locale;
  text: string;
  linkText: string;
}) {
  return (
    <label className="flex items-start gap-2 text-sm text-graphite">
      <input type="checkbox" name={name} required className="mt-1" />
      <span>
        {text}{" "}
        <a href={`/${locale}/consent`} className="text-bordeaux underline underline-offset-2">
          {linkText}
        </a>
        .
      </span>
    </label>
  );
}
