import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "sand";
  id?: string;
};

export default function Section({ children, className = "", tone = "cream", id }: SectionProps) {
  const bg = tone === "sand" ? "bg-sand" : "bg-cream";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">{children}</div>
    </section>
  );
}
