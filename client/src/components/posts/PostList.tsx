import PostCard from './PostCard'
import PostCardSkeleton from './PostCardSkeleton'
import React from 'react'

interface Post {
  _id: string
  title: string
  author: string
  category: string
  content: string
  tags: string[]
}

interface PostListProps {
  posts: Post[]
  isLoading: boolean
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading }) => {
  // When there are no posts, render skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostList
