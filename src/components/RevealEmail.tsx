"use client";

import { useState } from "react";
import { links } from "@/lib/content";

// Shows the email address only after a click, so it isn't sitting in plain view for scrapers.
export default function RevealEmail() {
  const [address, setAddress] = useState<string | null>(null);

  if (address) {
    return (
      <a href={`mailto:${address}`} className="email-revealed" aria-live="polite">
        {address}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="email-reveal"
      onClick={() => setAddress(`${links.email.user}@${links.email.domain}`)}
    >
      Email
    </button>
  );
}
