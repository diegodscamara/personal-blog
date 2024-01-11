import PostCard from './PostCard'
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
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) return null

  const latestPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div>
      {/* Featured Post Section */}
      <div className="grid grid-cols-1 align-top sm:grid-cols-3 gap-4 mb-8">
        <PostCard post={latestPost} isLarge />
        <div className="grid col-span-1 gap-4">
          {otherPosts.slice(0, 2).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Other Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {otherPosts.slice(2).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostList
