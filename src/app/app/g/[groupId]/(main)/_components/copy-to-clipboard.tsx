"use client";

import { useEffect, useState } from "react";

export function CopyToClipboard({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  return (
    <div>
      <button onClick={copy}>
        {copied ? "Copied" : "Copy"}
        {children}
      </button>
    </div>
  );
}
