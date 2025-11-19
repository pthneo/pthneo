import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { BlocksFeature } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

/**
 * Creates the Payload config for the blog.
 */
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL!,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!
  }),
  sharp,
  admin: {
    user: "users"
  },
  collections: [
    {
      slug: "projects",
      admin: {
        useAsTitle: "title"
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true
        },
        {
          name: "description",
          type: "textarea",
          required: true
        },
        {
          name: "website",
          type: "text"
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media"
        }
      ]
    },
    {
      slug: "posts",
      admin: {
        useAsTitle: "title"
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true
        },
        {
          name: "slug",
          type: "text",
          required: true
        },
        {
          name: "thumbnail",
          type: "upload",
          relationTo: "media",
          required: true
        },
        {
          name: "banner",
          type: "upload",
          relationTo: "media",
          required: true
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              BlocksFeature({
                blocks: [
                  {
                    slug: "code",
                    interfaceName: "Code",
                    fields: [
                      {
                        name: "filename",
                        type: "text"
                      },
                      {
                        name: "language",
                        type: "select",
                        options: [
                          {
                            label: "JavaScript",
                            value: "javascript"
                          },
                          {
                            label: "TypeScript",
                            value: "typescript"
                          },
                          {
                            label: "TSX",
                            value: "tsx"
                          },
                          {
                            label: "JSX",
                            value: "jsx"
                          },
                          {
                            label: "Python",
                            value: "python"
                          },
                          {
                            label: "HTML",
                            value: "html"
                          },
                          {
                            label: "CSS",
                            value: "css"
                          },
                          {
                            label: "JSON",
                            value: "json"
                          }
                        ],
                        defaultValue: "typescript"
                      },
                      {
                        name: "code",
                        type: "code",
                        label: false,
                        required: true
                      }
                    ]
                  }
                ]
              })
            ]
          })
        },
        {
          name: "publishedDate",
          type: "date",
          required: true
        },
        {
          name: "tags",
          type: "array",
          fields: [
            {
              name: "tag",
              type: "text",
              required: true
            }
          ],
          required: true
        },
        {
          name: "excerpt",
          type: "textarea",
          required: true
        }
      ]
    },
    {
      slug: "media",
      upload: {
        staticDir: "media",
        mimeTypes: ["image/*"]
      },
      access: {
        read: () => true
      },
      fields: [
        {
          name: "alt",
          type: "text",
          required: true
        }
      ]
    },
    {
      slug: "users",
      auth: true,
      fields: [
        {
          name: "name",
          type: "text"
        }
      ]
    }
  ]
});
