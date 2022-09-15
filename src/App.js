import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom'
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import MissingPage from './components/missingPage/MissingPage';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from './api/posts'


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate.push('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date (), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody}
    const allPosts = [...posts, newPost]
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }


  return (
    <>
      <div className="App">
        <Header title="G-Blog"/>
        <Nav search={search} setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<Home posts={searchResults}/>}/>
          <Route path='/post' element={<NewPost postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit} />} />
          <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />}/>
          <Route path='/about' element={<About />} />
          <Route path='*' element={<MissingPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
