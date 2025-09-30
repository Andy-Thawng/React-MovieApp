import React, { useState } from 'react'
import './App.css'
import Search from './components/search'

const App = () => {

  const [query, setQuery] = useState('');
  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="/hero-img.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        </header>

        <Search query={query} setQuery={setQuery}/>

        <h1>{query}</h1>
      </div>
    </main>
  )
}

export default App