import './App.css';
import {BrowserRouter as Router, Route, Routes, useHistory} from 'react-router-dom'
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import MissingPage from './components/missingPage/MissingPage';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header title="G-Blog"/>
        <Nav />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/post' element={<NewPost />} />
          <Route path='/post:id' element={<PostPage />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<MissingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
