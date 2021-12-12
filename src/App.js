import './App.css';
// import oridata from './data/players.json'
import data from './data/players.json'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Nav from './components/Nav';
import Playerlist from './pages/PlayerList';
import PlayerDetail from './pages/PlayerDetail';

function App() {
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
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
