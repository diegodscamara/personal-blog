import React, { useEffect, useState } from 'react'

import PostList from '@/components/posts/PostList'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
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
    try {
      const response = await fetch(
        `http://localhost:8080/posts/search?query=${encodedQuery}`,
      )
      const data = await response.json()
      if (data.success) {
        setPosts(data.posts)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
      setPosts([])
    }
  }

  const handleSearch = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    fetchPosts(searchQuery)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
        />
        <button type="submit">Search</button>
      </form>
      {posts.length > 0 ? <PostList posts={posts} /> : <p>No results found</p>}
    </div>
  )
}

export default SearchPage
