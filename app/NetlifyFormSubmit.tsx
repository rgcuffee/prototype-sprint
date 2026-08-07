"use client";

import { useEffect, useRef, useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function NetlifyFormSubmit() {
  const markerRef = useRef<HTMLDivElement>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  useEffect(() => {
    const form = markerRef.current?.closest("form");
    if (!form) return;

    async function submitToNetlify(event: SubmitEvent) {
      event.preventDefault();

      const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submitButton?.disabled) return;

      setSubmissionState("submitting");
      form.setAttribute("aria-busy", "true");
      if (submitButton) submitButton.disabled = true;

      const encoded = new URLSearchParams();
      new FormData(form).forEach((value, key) => {
        if (typeof value === "string") encoded.append(key, value);
      });

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encoded.toString(),
        });

        if (!response.ok) throw new Error(`Form submission failed with ${response.status}`);

        setSubmissionState("success");
        window.location.assign("/thanks/");
      } catch {
        setSubmissionState("error");
        form.removeAttribute("aria-busy");
        if (submitButton) submitButton.disabled = false;
      }
    }

    form.addEventListener("submit", submitToNetlify);
    return () => form.removeEventListener("submit", submitToNetlify);
  }, []);

  return (
    <div
      ref={markerRef}
      className={`form-submit-status ${submissionState === "error" ? "error" : ""}`}
      role={submissionState === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      {submissionState === "submitting" && "Sending your request…"}
      {submissionState === "success" && "Request received. Opening your confirmation…"}
      {submissionState === "error" && "We couldn’t send that request. Check your connection and try again."}
    </div>
  );
}
