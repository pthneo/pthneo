"use client";

import { Copy, CheckSquare } from "@/components/icons";
import { Button } from "@/components/button";
import { useState } from "react";

/**
 * A header for the codeblock component
 */
export default function Header({ code, filename, language }: { code: string; filename?: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  // Copy the code to the clipboard and set the copied state to true
  const handleCopy = () => {
    if (!copied) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    }
  }

  return (
    <div className="bg-zinc-800 rounded-t-md px-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/50 font-mono">{ filename ?? "Code" }</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/50 font-mono">{copied ? "Copied" : language ?? "Copy"}</span>
        <Button variant="ghost" size="icon" onClick={handleCopy} className="cursor-pointer">
          {copied ? (
            <CheckSquare className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4 text-white/50" />
          )}
        </Button>
      </div>
    </div>
  );
}