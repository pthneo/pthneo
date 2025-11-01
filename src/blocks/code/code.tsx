"use client";

import { Highlight, themes } from "prism-react-renderer";
import React from "react";
import Header from "./header";

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
    <Highlight language={language} code={code} theme={themes.nightOwl}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="bg-zinc-900 px-4 pb-8 text-xs rounded-md overflow-x-auto">
          <Header code={code} filename={filename} language={language} />
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, className: "table-row" })}>
              <span className="table-cell text-right select-none text-white/25">{ i + 1 }</span>
              <span className="table-cell pl-4">
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}