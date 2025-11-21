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
    <div className="min-w-0 mb-4 w-full max-w-full">
      <Highlight language={language ?? ""} code={code} theme={themes.nightOwl}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="bg-zinc-900 rounded-md overflow-hidden w-full max-w-full">
            <Header code={code} filename={filename} language={language} />
            <div className="overflow-x-auto w-full max-w-full">
              <pre className="text-xs font-mono pb-4 pt-1 m-0">
                <div className="px-4 pt-2 table">
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, className: "table-row whitespace-pre" })}>
                      <span className="table-cell text-right select-none text-white/25 font-mono pr-4">{ i + 1 }</span>
                      <span className="table-cell font-mono whitespace-pre">
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
            </div>
          </div>
        )}
      </Highlight>
    </div>
  );
}