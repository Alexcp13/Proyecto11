

import { Route, Routes } from 'react-router-dom'
import "./App.css"

import Game1 from './pages/Game1/game1'
import Header from './components/Header/Header'
import Game2 from './pages/Game2/game2'
import Characters from './pages/Characters/characters'





const App = () => {


  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Game1 />} />
        <Route path='/rotateGame' element={<Game2 />} />
        <Route path='/characters' element={<Characters />} />
      </Routes>


    </div>
  );

};

export default App;
