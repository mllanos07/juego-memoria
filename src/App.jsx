import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [board, setBoard] = useState([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ])
  const [revealedBoard, setRevealedBoard] = useState([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ])
  const [gameOver, setGameOver] = useState(false)

  const cards = ['🍉', '🍌', '🍇', '🍓', '🍒', '🍑']
  

  const shuffle = (array) => {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]]
    }
    return shuffledArray
  }

  const initializeBoard = () => {
    const dobleCards = [...cards, ...cards]
    const shuffledCards = shuffle(dobleCards);
    const newBoard = [];
    while (shuffledCards.length) {
      newBoard.push(shuffledCards.splice(0, 4));
    }
    setBoard(newBoard);
  }

  useEffect(() => {
    initializeBoard();
  }, []);


  const handleReset = () => {
    setBoard([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ])
    setRevealedBoard([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ])
    setGameOver(false)
    initializeBoard()
  }

  const handleCellClick = (rowIndex, colIndex) => {
    const revealedCard = board[rowIndex][colIndex]
    console.log("revealedCard", revealedCard)
    console.log("board", board)
    console.log("revealedBoard", revealedBoard)

    // si ya hay dos revelados que son distintos, reseteo revealedBoard
    const revealedCount = revealedBoard.flat().filter((card) => card !== null).length
    console.log("revealedCount", revealedCount)
    if (revealedCount === 2) {
      const resetedBoard = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ]
      setRevealedBoard(resetedBoard)
      return
    }
    
    // cambiar el estado de la celda
    const newCardFlipped = [...revealedBoard]
    newCardFlipped[rowIndex][colIndex] = revealedCard
    setRevealedBoard(newCardFlipped)

    // detectar fin del juego (un par igual en el revealed board)
    const revealedCards = revealedBoard.flat().filter(card => card === revealedCard)
    console.log("revealedPairs", revealedCards)
    if (revealedCards.length === 2) {
      setGameOver(true)
      console.log("gameOver")
      return
    }

    // si no hay reveladas o hay una sola revelada continuo, sino reseteo
    if (revealedCount > 2) {
      const resetedBoard = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ]
      console.log("se llama a setRevealedBoard")
      setRevealedBoard(resetedBoard)
      return
    }
  }

  return (
    <>
      <h1>Juego de la memoria</h1>
      <h2 className='mensaje'>{ gameOver === true ? "Ganaste!!!" : ''}</h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((card, colIndex) => (
              <div className="celda" key={colIndex} onClick={() => handleCellClick(rowIndex, colIndex)}>
                {revealedBoard[rowIndex][colIndex] !== null ? card : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <br></br>
      <button onClick={handleReset}>Reiniciar</button>
    </>
  )
}

export default App

