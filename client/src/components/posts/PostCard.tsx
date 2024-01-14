import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Link } from 'react-router-dom'
import React from 'react'

interface Post {
  _id: string
  title: string
  author: string
  category: string
  content: string
  tags: string[]
}

const PostCard: React.FC<{ post: Post; isLarge?: boolean }> = ({ post }) => {
  return (
    <Card className=" bg-white shadow rounded-lg p-4 flex flex-col">
      <Link
        to={`/posts/${post._id}`}
        className="text-blue-500 hover:text-blue-600 transition-colors mt-auto flex flex-col justify-start h-full gap-4"
      >
        <CardHeader className="p-0 m-0">
          <CardTitle className="block font-heading font-extrabold dark:text-slate-100 text-xl font-heading text-slate-900 hover:opacity-75">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-col gap-2 justify-between h-full">
          <CardContent className="m-0 p-0 break-words text-lg leading-snug text-slate-500 hover:opacity-75 dark:text-slate-400">
            By {post.content}
          </CardContent>
          <CardFooter className="m-0 p-0 flex justify-baseline items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <p className="text-sm blog-article-card-author-name block font-semibold text-slate-700 dark:text-slate-400">
              By {post.author}
            </p>
          </CardFooter>
        </CardDescription>
      </Link>
    </Card>
  )
}

export default PostCard
