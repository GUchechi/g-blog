import './App.css';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import MissingPage from './components/missingPage/MissingPage';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import EditPost from './components/EditPost';
import { DataProvider} from './context/DataContext'
import { Route, Routes, useNavigate} from 'react-router-dom'


function App() {
  
  return (
    <>
      <div className="App">
        <DataProvider>
            <Header title="G-Blog"/>
            <Nav />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/post' element={<NewPost />} />
              <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />}/>
              <Route path="/edit/:id" element={ <EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody}/>} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<MissingPage />} />
            </Routes>
            <Footer />
        </DataProvider>
      </div>
    </>
  );
}

export default App;
