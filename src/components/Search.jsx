import React from 'react'

const search = ({query, setQuery}) => {
  return (
    <div className="search">
        <div>
            <img src="./search.svg" alt="search" />

            <input 
                type="text"
                placeholder='Search through thousands of movies...' 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    </div>
  )
}

export default search