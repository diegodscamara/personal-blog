import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Home } from './pages/home'
import React from 'react'
import { ThemeProvider } from './components/theme-provider'

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
          {/* other routes */}
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
