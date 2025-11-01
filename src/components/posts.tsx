
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export type Post = {
  id: string
  title: string
  excerpt?: string
  publishedDate: string
  tags?: Array<{ tag: string }>
  slug?: string
}

type PostsListProps = {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags?.forEach(t => {
        if (t.tag) tagSet.add(t.tag)
      })
    })
    return Array.from(tagSet).sort()
  }, [posts])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag = selectedTag === 'all' || 
        post.tags?.some(t => t.tag === selectedTag)

      return matchesSearch && matchesTag
    })

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

    return filtered
  }, [posts, searchQuery, selectedTag, sortBy])

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <div className="flex flex-wrap gap-4">
          <select 
            value={selectedTag} 
            onChange={(e) => setSelectedTag(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        Showing {filteredPosts.length} of {posts.length} posts
      </p>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length === 0 ? (
          <p className="col-span-full py-12 text-center text-gray-500">No posts found</p>
        ) : (
          filteredPosts.map(post => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug || post.id}`}
              className="group space-y-3 rounded-lg border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                {post.title}
              </h2>
              
              <time className="block text-sm text-gray-500">
                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>

              {post.excerpt && (
                <p className="line-clamp-3 text-gray-600">
                  {post.excerpt}
                </p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((item, i) => (
                    <span 
                      key={i} 
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}