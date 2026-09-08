"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContractForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.forms.contract;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contract-request", {
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
        <Field label={t.company} name="company" required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.phone} name="phone" type="tel" required />
        <Field label={t.preferredContact} name="preferredContact" placeholder={t.preferredContactPlaceholder} required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.messenger} name="messenger" />
        <Field label={t.email} name="email" type="email" />
      </div>

      <TextArea label={t.orderSummary} name="orderSummary" required />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.category} name="category" required />
        <Field label={t.quantity} name="quantity" placeholder={t.quantityPlaceholder} required />
      </div>

      <fieldset className="grid gap-3 border border-line p-4 text-sm text-graphite md:grid-cols-2">
        <legend className="px-1 font-sans text-sm text-graphite/70">{t.additionalLegend}</legend>
        <Checkbox label={t.hasSample} name="hasSample" />
        <Checkbox label={t.hasSpec} name="hasSpec" />
        <Checkbox label={t.hasPatterns} name="hasPatterns" />
        <Checkbox label={t.needsPatternDevelopment} name="needsPatternDevelopment" />
      </fieldset>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.fabricSource} name="fabricSource" placeholder={t.fabricPlaceholder} />
        <Field label={t.desiredTimeline} name="desiredTimeline" />
      </div>

      <Field label={t.referenceLink} name="referenceLink" />
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        className="w-full border border-line bg-cream px-3 py-2 text-graphite outline-none focus:border-bordeaux"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm text-graphite">
      <span className="mb-1 block">
        {label}
        {required && <span className="text-bordeaux"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="w-full border border-line bg-cream px-3 py-2 text-graphite outline-none focus:border-bordeaux"
      />
    </label>
  );
}

function Checkbox({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" name={name} />
      {label}
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
