import Code from "./code";

export type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  blockType: "code";
}

/**
 * Exports the code block component
 */
export default function CodeBlock({
  code,
  language = "",
  filename
}: CodeBlockProps) {
  return Code({ code, language, filename });
}
