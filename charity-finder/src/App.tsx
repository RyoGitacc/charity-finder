import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import CharityDetail from './pages/CharityDetail';
import Favorite from './pages/Favorite';
import Home from './pages/Home';

function App() {
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:ein' element={<CharityDetail/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
