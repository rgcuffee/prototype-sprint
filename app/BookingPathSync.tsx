"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function BookingPathSync() {
  const searchParams = useSearchParams();
  const requestedStart = searchParams.get("start");

  useEffect(() => {
    const value = requestedStart === "sprint"
      ? "Direct $500 Prototype Sprint request"
      : "Free 15-minute Sprint Fit Call";
    const input = document.querySelector<HTMLInputElement>(
      `input[name="start-path"][value="${value}"]`,
    );

    if (input) input.checked = true;
  }, [requestedStart]);

  return null;
}
