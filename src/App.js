import './App.css'
import { useState } from 'react'

function App() {
  const [playerOne, setPlayerOne] = useState({ name: 'PlayerOne', symbol: 'X', score: 0 })
  const [playerTwo, setPlayerTwo] = useState({ name: 'PlayerTwo', symbol: 'O', score: 0 })
  const [currentPlayer, setCurrentPlayer] = useState(playerOne)
  const [boxes, setBoxes] = useState(Array(9).fill('').map((e, i) => { return { id: i + 1, value: null } }))

  function playerWins(player) {
    if (player.name === 'PlayerOne') setPlayerOne({ ...playerOne, score: playerOne.score + 1 })
    else setPlayerTwo({ ...playerTwo, score: playerTwo.score + 1 })
    alert(`Player ${player.name} wins`)
    reset()
  }

  function reset() {
    setCurrentPlayer(playerOne)
    setBoxes(Array(9).fill('').map((e, i) => { return { id: i + 1, value: null } }))
  }

  function isFilled(id) {
    console.log(id, currentPlayer.symbol)
    const alreadyFilled = boxes.find(e => e.id === id && e.value !== null)
    console.log(alreadyFilled)
    return alreadyFilled ? true : false
  }

  function updateBoxes({ id, value }) {
    console.log(value)
    if (isFilled(id)) return alert('Box already filled!')
    const newBoxes = boxes.map((e) => {
      if (id === e.id && !value) return { id: id, value: currentPlayer.symbol }
      return e
    })

    // check rows
    for (let i = 0; i < 3; i++)
      if (
        currentPlayer.symbol === newBoxes[i].value
        && newBoxes[i].value === newBoxes[i + 1].value
        && newBoxes[i + 1].value === newBoxes[i + 2].value
      ) return playerWins(currentPlayer)
    
    // check columns
    for (let i = 0; i < 3; i++) 
      if (
        currentPlayer.symbol === newBoxes[i].value
        && newBoxes[i].value === newBoxes[i + 3].value
        && newBoxes[i + 3].value === newBoxes[i + 6].value
      ) return playerWins(currentPlayer)

    // check diaognals
    if (
      (currentPlayer.symbol === newBoxes[0].value
        && newBoxes[0].value === newBoxes[4].value
        && newBoxes[4].value === newBoxes[8].value
      ) || (
        currentPlayer.symbol === newBoxes[2].value
        && newBoxes[0].value === newBoxes[4].value
        && newBoxes[4].value === newBoxes[6].value
      )
    )
      return playerWins(currentPlayer)
    setBoxes(newBoxes)
    setCurrentPlayer(currentPlayer.name === 'PlayerOne' ? playerTwo : playerOne)
  }

  return (
    <div className="w-full min-h-screen m-0 p-4">
      <div className='w-full bg-black text-white p-4 mb-10'>
        <div className='flex justify-between items-center mb-2'>
          <h2>Current Player is <span className='text-sky-500 font-bold'>{currentPlayer.name}</span></h2>
          <button className='bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-4 rounded' onClick={() => reset()}>Reset</button>
        </div>
        <h3>Player One Score - <span className='text-red-500 font-bold'>{playerOne.score}</span></h3>
        <h3>Player Two Score - <span className='text-red-500 font-bold'>{playerTwo.score}</span></h3>
      </div>
      <div className="w-full grid grid-cols-3 grid-rows-3 gap-4">
        {boxes.map(box => (
          <div key={box.id} className="bg-sky-600 font-bold text-white p-4 cursor-pointer" onClick={() => updateBoxes(box)}>
            {box.value || '-'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
