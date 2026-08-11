"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- This shared menu intentionally uses full-page navigation across the interactive case-study route. */

import { useEffect, useRef, useState, type MouseEvent } from "react";

type MobileMenuProps = {
  current?: "home" | "case-studies";
};

const links = [
  { number: "01", label: "Home", href: "/", page: "home" },
  { number: "02", label: "Case studies", href: "/case-studies", page: "case-studies" },
  { number: "03", label: "How it works", href: "/#how-it-works" },
  { number: "04", label: "Sprint menu", href: "/#menu" },
  { number: "05", label: "Pricing", href: "/#pricing" },
  { number: "06", label: "FAQ", href: "/#faq" },
];

export function MobileMenu({ current }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = "mobile-site-navigation";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.assign(href);
  };

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1181px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", closeAtDesktop);
    return () => query.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");
    window.requestAnimationFrame(() => firstLink?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }
      if (event.key !== "Tab") return;

      const panelLinks = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
      const focusable = [toggleRef.current, ...panelLinks].filter(Boolean) as HTMLElement[];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="mobile-menu-root">
      <button
        ref={toggleRef}
        className={`mobile-menu-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(value => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden="true"><b /><b /></i>
      </button>
      {open && (
        <div ref={panelRef} className="mobile-menu-panel" id={panelId} role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="mobile-menu-inner">
            <p>Explore Proto Sprint</p>
            <ol>
              {links.map(link => {
                const active = link.page === current;
                return (
                  <li key={link.label}>
                    <a className={active ? "active" : ""} href={link.href} aria-current={active ? "page" : undefined} onClick={event => navigate(event, link.href)}>
                      <span>{link.number}</span><strong>{link.label}</strong><b aria-hidden="true">↗</b>
                    </a>
                  </li>
                );
              })}
            </ol>
            <div className="mobile-menu-actions">
              <a href="/?start=fit#booking" onClick={event => navigate(event, "/?start=fit#booking")}>Book a free fit call</a>
              <a href="/?start=sprint#booking" onClick={event => navigate(event, "/?start=sprint#booking")}>Request a $500 sprint <span aria-hidden="true">↗</span></a>
            </div>
            <small>Live, collaborative, AI-assisted.</small>
          </div>
        </div>
      )}
    </div>
  );
}
