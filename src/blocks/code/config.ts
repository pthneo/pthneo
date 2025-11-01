import { Block } from "payload";

export const code: Block = {
  slug: "code",
  interfaceName: "Code",
  fields: [
    {
      name: "filename",
      type: "text",
    },
    {
      name: "language",
      type: "select",
      options: [
        {
          label: "JavaScript",
          value: "javascript",
        },
        {
          label: "TypeScript",
          value: "typescript",
        },
        {
          label: "TSX",
          value: "tsx",
        },
        {
          label: "JSX",
          value: "jsx",
        },
        {
          label: "Python",
          value: "python",
        },
        {
          label: "HTML",
          value: "html",
        },
        {
          label: "CSS",
          value: "css",
        },
        {
          label: "JSON",
          value: "json",
        },
      ],
      defaultValue: "typescript",
    },
    {
      name: "code",
      type: "code",
      label: false,
      required: true,
    },
  ],
};