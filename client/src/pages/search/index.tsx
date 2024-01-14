import React, { useEffect, useState } from 'react'
import { SearchIcon, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import PostList from '@/components/posts/PostList'
import { Separator } from '@/components/ui/separator'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const queryParam = searchParams.get('query')
    if (queryParam) {
      setSearchQuery(queryParam)
      fetchPosts(queryParam)
    }
  }, [location])

  const fetchPosts = async (query: string | number | boolean) => {
    const encodedQuery = encodeURIComponent(query)
    setisLoading(true)
    try {
      const response = await fetch(
        `http://localhost:8080/posts/search?query=${encodedQuery}`,
      )
      const data = await response.json()
      if (data.success) {
        setPosts(data.posts)
        setisLoading(false)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
      setPosts([])
    }
  }

  const handleSearch = async (event: { preventDefault: () => void }) => {
    if (searchQuery.length > 0) {
      event.preventDefault()
      fetchPosts(searchQuery)
    }
  }

  const handleClear = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setSearchQuery('')
    fetchPosts('')
  }

  return (
    <div>
      <form className="relative max-w-96">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
        />
        <SearchIcon
          onClick={handleSearch}
          size={20}
          className={`absolute top-2.5 cursor-pointer ${
            searchQuery.length > 0 ? 'right-12' : 'right-4'
          }`}
        />
        <X
          onClick={handleClear}
          size={20}
          className={`absolute top-2.5 cursor-pointer ${
            searchQuery === '' ? 'hidden' : 'right-4'
          }`}
        />
      </form>
      <Separator className="my-4" />
      {posts.length > 0 ? (
        <PostList posts={posts} isLoading={isLoading} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  )
}

export default SearchPage
