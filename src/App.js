import './App.css';
// import oridata from './data/players.json'
import data from './data/players.json'

import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom'
import Nav from './components/Nav';
import Playerlist from './pages/PlayerList';
import PlayerDetail from './pages/PlayerDetail';

function App() {
  const [ playerInfo, setPlayerInfo] = useState([])
  const [player, setPlayer] = useState('')
  // const [ data, setData] = useState([])

  // useEffect(() => {
  //   let newData = [...oridata]
  //   newData = [...newData].sort((a,b)=>b.points_per_game -a.points_per_game )
  //   setData(newData)
  //   console.log(newData)
  // }, []);

  return (
    <Router>
      <Nav></Nav>
      <Switch>
        <Route path="/detail">
          <PlayerDetail data={data}/>
        </Route>

        <Route path="/">
          <Playerlist 
            data={data}
            player={player}
            setPlayer={setPlayer}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
