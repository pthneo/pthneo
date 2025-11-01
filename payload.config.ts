import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { BlocksFeature } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { code } from "./src/blocks/code/config";

/**
 * Creates the Payload config for the blog.
 */
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL!,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  sharp,
  admin: {
    user: "users",
  },
  collections: [
    {
      slug: "projects",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "website",
          type: "text",
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      slug: "posts",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              BlocksFeature({
                blocks: [code],
              }),
            ],
          }),
        },
        {
          name: "publishedDate",
          type: "date",
          required: true,
        },
        {
          name: "tags",
          type: "array",
          fields: [
            {
              name: "tag",
              type: "text",
            },
          ],
        },
        {
          name: "excerpt",
          type: "textarea",
        },
      ],
    },
    {
      slug: "media",
      upload: {
        staticDir: 'media',
        mimeTypes: ['image/*'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "alt",
          type: "text",
        },
      ],
    },
    {
      slug: "users",
      auth: true,
      fields: [
        {
          name: "name",
          type: "text",
        },
      ],
    },
  ],
});

