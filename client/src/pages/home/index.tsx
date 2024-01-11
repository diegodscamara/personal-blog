import React, { useEffect, useState } from 'react'

import PostList from '@/components/posts/PostList'

interface Post {
  _id: string
  title: string
  content: string
  author: string
  category: string
  tags: string[]
}

/**
 * Fetches posts from the server and renders a list of posts.
 * @returns The rendered post list.
 */
export function Home(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/posts')
      .then((response) => response.json())
      .then((data: { success: boolean; posts: Post[] }) => {
        if (data.success) {
          setPosts(data.posts)
        }
      })
      .catch((error: Error) => {
        console.error('Error fetching posts:', error)
      })
  }, [])

  return <PostList posts={posts} />
}
