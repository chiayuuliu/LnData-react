import './App.css';
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

  // useEffect(() => {
  //   const newPlayerInfo = data.filter(function(el){
  //       return el.name === player
  //   })
  //   console.log(player)
  //   console.log(newPlayerInfo)
  //   setPlayerInfo(newPlayerInfo)
    
  // }, [player]);

  return (
    <Router>
      <Nav></Nav>
        {/* <Playerlist
          data={data}
        /> */}
      <Switch>
        <Route path="/detail">
          <PlayerDetail
            data={data}
          />
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
