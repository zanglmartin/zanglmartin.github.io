import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}

export function PageIntro({ eyebrow, title, children, aside }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div>
        <span className="section-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="page-intro-copy">{children}</div>
      </div>
      {aside ? <aside className="page-intro-aside">{aside}</aside> : null}
    </section>
  );
}
