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
import ServerLoad from './components/Serverload/ServerLoad';
import { checkLoad } from './services/postServices';
import { useEffect, useState } from 'react';

function App() {
  const [load, setLoad] = useState(false);
  const [net, setNet] = useState(1);
  useEffect(() => {
    checkLoad()
      .then((res) => {
        setLoad(true);
      })
      .catch((err) => {
        setNet((prev) => prev + 1);
      });
  }, [load, net]);

  return (
    <div>
      <Router>
       {load &&  <Header />}
        <div className='bg'></div>
        <div className='body'>
          {!load ? (
            <ServerLoad />
          ) : (
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
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
