import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ConnectionPanel from "./components/ConnectionPanel";
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import MessagePanel from './components/MessagePanel';
import RestartPanel from './components/RestartPanel';
import LeaderBoard from './components/LeaderBoard';
import Header from './components/Header';
import Footer from './components/Footer';

require('dotenv').config()

function App() {

  const [grid, setGrid] = useState([])
  const [gameId, setGameId] = useState()
  const [player1Score, setPlayer1Score] = useState()
  const [player1, setPlayer1] = useState()
  const [player2Score, setPlayer2Score] = useState()
  const [player2, setPlayer2] = useState()
  const [message, setMessage] = useState('')
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [isConnected, setConnected] = useState(false)
  const [highScoreData, setHighScoreData] = useState([])
  const [gridSize, setGridSize] = useState(3)


  useEffect(() => {
    updateHighScoreData()
  }, [])

  
  const fetchHighScoreData = async () => {
    try{
      const res = await fetch(`${process.env.REACT_APP_NODE_SERVER_ADDRESS}/games/highScores`)
      const parsed = await res.json()

      return parsed.data ?? [];
    }
    catch(e){
      console.error('failed to fetch high scores:', e)
    }
    return [];
  }

  const updateHighScoreData = async () => {
    const data = await fetchHighScoreData()
    setHighScoreData(data)
  }

  const applyGameData = (data) => {
    setGrid(data.grid);
    setPlayer1Score(data.player1Score)
    setPlayer2Score(data.player2Score)
    setPlayer1(data.player1)
    setPlayer2(data.player2)
  }

  const connectToServer = async (name, size, level) => {

    console.log(`connectToServer called with ${name}`);

    setGridSize(size);
    let result;
    try {
      const res = await fetch(`${process.env.REACT_APP_NODE_SERVER_ADDRESS}/games`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ playerName: name, gridSize: parseInt(size), gameLevel: parseInt(level) }),
      })

      result = await res.json()
    }
    catch (e) {
      console.error("Exception during fetch", e);
      return;
    }

    if (!result?.data?.grid) {
      console.error("Failed to parse result")
      return;
    }

    applyGameData(result.data);
    setGameId(result.data._id);
    setMessage('')
    setIsGameFinished(false)
    setConnected(true)
  }



  const cellClicked = async ({ x, y }) => {
    console.log(`cell clicked ${x} ${y}`);

    if (isGameFinished){
      // cell clicks ignored when game is finished
      return;
    }

    let result;
    try {
      const res = await fetch(`${process.env.REACT_APP_NODE_SERVER_ADDRESS}/games/${gameId}/moves`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ x, y }),
      })

      result = await res.json()
    }
    catch (e) {
      console.error("Exception during posting a move", e);
      return;
    }

    if (!result?.data?.grid) {
      console.error("Failed to parse result")
      return;
    }

    applyGameData(result.data);
    setIsGameFinished(result.data.isFinished)

    // create the finish message
    if (result.data.isFinished) {
      let tempMessage = 'Game Finished!';
      if (result.data.winner === 1) {
        tempMessage += ` The winner is ${result.data.player1}!`
      }
      else if (result.data.winner === 2) {
        tempMessage += ` The winner is ${result.data.player2}!`
      }
      else {
        tempMessage += ` Result is a tie!`
      }

      setMessage(tempMessage)
    }
  }

  const restartClicked = async () => {
    console.log(`restart clicked`);

    setIsGameFinished(false)
    setMessage('')

    let result;
    try {
      const res = await fetch(`${process.env.REACT_APP_NODE_SERVER_ADDRESS}/games/${gameId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ isFinished: false }),
      })

      result = await res.json()
    }
    catch (e) {
      console.error("Exception during fetch", e);
      return;
    }

    if (!result?.data?.grid) {
      console.error("Failed to parse result")
      return;
    }

    applyGameData(result.data);
  }

  // RENDER

  return (
    <Router>
    <div className="container">
      <Header /> 
      <div className="main-area">
        <Routes>
          <Route path='/leaderBoard' element={<LeaderBoard highScoreData={highScoreData}/>} />
          <Route
              path='/'
              exact
              element={
                <>
                  {!isConnected && (
                    <ConnectionPanel onConnect={connectToServer} />
                  )}

                  {isConnected && (
                    <>
                      <ScoreBoard player1Score={player1Score} player2Score={player2Score} player1={player1} player2={player2} />
                      <Board grid={grid} cellClicked={cellClicked} gridSize={gridSize}></Board>
                      <MessagePanel message={message} />
                      {isGameFinished && (
                        <RestartPanel onRestart={restartClicked}></RestartPanel>
                      )}
                    </>
                  )}
                </>
              }
            />
        </Routes>
      </div>
      <Footer updateLeaders={updateHighScoreData}/>
    </div>
    </Router>
  );
}



export default App;
