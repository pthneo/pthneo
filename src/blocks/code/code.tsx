"use client";

import { Highlight, themes } from "prism-react-renderer";
import React from "react";
import Header from "./header";
import { cn } from "@/lib/utils";

/**
 * A custom codeblock component for the blog.
 */ 
export default function Code({
  code,
  language = "",
  filename
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  if (!code) return null;

  return (
    <Highlight language={language ?? ""} code={code} theme={themes.nightOwl}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="bg-zinc-900 pb-2 text-xs rounded-md overflow-x-scroll font-mono">
          <Header code={code} filename={filename} language={language} />
          <div className="px-4 pt-2">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, className: "table-row" })}>
              <span className="table-cell text-right select-none text-white/25 font-mono">{ i + 1 }</span>
              <span className="table-cell pl-4 font-mono">
              {line.map((token, key) => {
                const tokenProps = getTokenProps({ token, key });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { key: _key, className: _className, ...restProps } = tokenProps;
                return <span key={key} className={cn(_className, "font-mono")} {...restProps} />;
              })}
              </span>
            </div>
          ))}
          </div>
        </pre>
      )}
    </Highlight>
  );
}