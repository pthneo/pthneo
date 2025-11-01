// In your page/component
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import Code from '@/blocks/code/code'

async function getPost(id: string) {
  const payload = await getPayload({ config: configPromise })
  
  const post = await payload.findByID({
    collection: 'posts',
    id,
  })
  
  return post
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    code: ({ node }: { node: any }) => <Code code={node.fields.code} language={node.fields.language} filename={node.fields.filename}/>
  },
})

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article>
      <h1>{post.title}</h1>
      
      {post.publishedDate && (
        <time>{new Date(post.publishedDate).toLocaleDateString()}</time>
      )}
      
      {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
      
      {post.tags && post.tags.length > 0 && (
        <div className="tags">
          {post.tags.map((item: { tag: string }, i: number) => (
            <span key={i}>{item.tag}</span>
          ))}
        </div>
      )}
      
      <div className="content">
        <RichText data={post.content} converters={jsxConverters} />
      </div>
    </article>
  )
}