import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Anime from './pages/Anime';
import Header from './components/Header/Header';
import Nomatch from './pages/Nomatch';
import Filter from './pages/Filter';
import Post from './pages/Post';
import Discuss from './pages/Discuss';
import User from './pages/User';
import Top from './pages/Top';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className='bg'></div>
        <div className='body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/anime/:id' element={<Anime />} />
            <Route path='anime/:id/:discid' element={<Discuss />} />
            <Route path='/user/:username' element={<User />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='/newpost' element={<Post />} />
            <Route path='/top' element={<Top />} />
            <Route path='/404' element={<Nomatch />} />
            <Route path='*' element={<Navigate to='/404' />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
