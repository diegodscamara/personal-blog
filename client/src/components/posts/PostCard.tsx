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

const PostCard: React.FC<{ post: Post; isLarge?: boolean }> = ({
  post,
  isLarge = false,
}) => {
  const cardClasses = isLarge
    ? 'col-span-full sm:col-span-2'
    : 'col-span-1 sm:col-span-1'

  const titleClasses = isLarge ? 'md:text-3xl lg:text-4xl' : ''
  return (
    <Card
      className={`${cardClasses} bg-white shadow rounded-lg p-4 flex flex-col`}
    >
      <Link
        to={`/posts/${post._id}`}
        className="text-blue-500 hover:text-blue-600 transition-colors mt-auto flex flex-col justify-baseline h-full gap-4"
      >
        <CardHeader className="p-0 m-0">
          <CardTitle
            className={`${titleClasses} block font-heading font-extrabold text-slate-900 hover:opacity-75 dark:text-slate-100 text-xl
block font-heading font-extrabold text-slate-900 hover:opacity-75 dark:text-slate-100 text-xl`}
          >
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-col gap-2">
          <CardContent className="m-0 p-0 break-words text-lg leading-snug text-slate-500 hover:opacity-75 dark:text-slate-400">
            By {post.content}
          </CardContent>
          <CardFooter className="m-0 p-0 flex flex-col justify-baseline h-full items-baseline gap-2">
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
