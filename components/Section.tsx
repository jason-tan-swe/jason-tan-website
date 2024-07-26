"use client";

type SectionType = "fullscreen" | "fit" | "grow";

export default function Section({
  children,
  className = "",
  type = "fit",
}: {
  children: React.ReactNode;
  className: string | undefined;
  type?: SectionType;
}) {
  const sectionStyles = {
    fullscreen: "max-h-section h-section",
    fit: "max-h-content h-content",
    grow: "flex grow",
  };
  return (
    <section className={`${sectionStyles[type]} ${className}`}>
      {children}
    </section>
  );
}
