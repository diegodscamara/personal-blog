import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Home } from './pages/home'
import Layout from './components/layout'
import PostPage from './pages/post'
import React from 'react'
import { ThemeProvider } from './components/theme-provider'

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:postId" element={<PostPage />} />
            {/*  <Route path="/contact" element={<ContactPage />} /> */}
            {/* other routes */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
