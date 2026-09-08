"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.forms.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
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
        <label className="block text-sm text-graphite">
          <span className="mb-1 block">{t.name} <span className="text-bordeaux">*</span></span>
          <input
            name="name"
            required
            className="w-full border border-line bg-cream px-3 py-2 outline-none focus:border-bordeaux"
          />
        </label>
        <label className="block text-sm text-graphite">
          <span className="mb-1 block">{t.phone} <span className="text-bordeaux">*</span></span>
          <input
            name="phone"
            type="tel"
            required
            className="w-full border border-line bg-cream px-3 py-2 outline-none focus:border-bordeaux"
          />
        </label>
      </div>

      <label className="block text-sm text-graphite">
        <span className="mb-1 block">{t.preferredContact}</span>
        <input
          name="preferredContact"
          className="w-full border border-line bg-cream px-3 py-2 outline-none focus:border-bordeaux"
        />
      </label>

      <label className="block text-sm text-graphite">
        <span className="mb-1 block">{t.subject}</span>
        <input
          name="subject"
          className="w-full border border-line bg-cream px-3 py-2 outline-none focus:border-bordeaux"
        />
      </label>

      <label className="block text-sm text-graphite">
        <span className="mb-1 block">{t.message} <span className="text-bordeaux">*</span></span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-line bg-cream px-3 py-2 outline-none focus:border-bordeaux"
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-graphite">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          {t.consentText}{" "}
          <a href={`/${locale}/consent`} className="text-bordeaux underline underline-offset-2">
            {t.consentLinkText}
          </a>
          .
        </span>
      </label>

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
