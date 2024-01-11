import React, { useCallback, useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/FormatDate'
import { useParams } from 'react-router-dom'

interface Post {
  title: string
  content: string
  author: string
  category: string
  tags: string[]
  createdAt: string
}

const PostPage: React.FC = (): JSX.Element => {
  const [post, setPost] = useState<Post | null>(null)
  const { postId } = useParams<{ postId: string }>()

  const fetchPost = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`)
      const data = await response.json()
      if (data.success) {
        setPost({
          ...data.post,
          createdAt: formatDate(data.post.createdAt),
        })
      } else {
        throw new Error('Post not found')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }, [postId])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (!post) return <div className="text-center text-slate-50">Loading...</div>

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="mt-6 break-words px-4 text-center font-heading text-3xl font-extrabold text-slate-900 dark:text-white md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl mb-8 md:mb-14">
        {post.title}{' '}
      </h1>

      <div className="flex gap-4 items-center justify-center">
        <span className="ml-2 font-semibold text-slate-600 dark:text-white md:ml-0">
          {post.author}
        </span>
        <span className="tooltip-handle text-slate-600 dark:text-slate-400">
          {post.createdAt}
        </span>
        <span className="tooltip-handle text-slate-600 dark:text-slate-400">
          {post.category}
        </span>
      </div>

      <p className="text-slate-700 dark:text-slate-100 text-xl max-w-3xl">
        {post.content}
      </p>

      <div className="flex gap-4 items-center justify-center">
        {post.tags.map((tag) => (
          <Badge
            className="mb-3 mr-3 rounded-lg border bg-slate-100 px-2 py-1 text-base font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            key={tag}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default PostPage
