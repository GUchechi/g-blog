import React from 'react'
import Feed from './Feed'
import DataContext from '../context/DataContext'
import { useContext } from 'react'


const Home = () => {
  const {searchResults, fetchError, isLoading} = useContext(DataContext)
  return (
    <main className="Home">
      {/* {posts.length ? (
        <Feed posts={posts} />
        ):(
          <p style={{marginTop: '2rem'}}>
            No posts to display
          </p>
      )} */}

      {isLoading && <p className='statusMsg'>Loading Posts, pls wait...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{ color : 'red'}}>Network Error...</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className='statusMsg'>No Posts to display!!!</p>)}
    </main>
  )
}

export default Home