import { useState } from 'react'
import './App.css'

function App() {
  const options = ['가위','바위','보']
  const [userWins , setUserWins] = useState(0)
  const [computerWins , setComputerWins] = useState(0)
  const [draws , setDraws] = useState(0)
  const [log, setLog] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const getComputerChoice = () => {
    const index = Math.floor(Math.random() * 3)
    return options[index]
  }

  const judge = (argUser , argComputer) => {
    if (
      (argUser === '가위' && argComputer === '보') ||
      (argUser === '바위' && argComputer === '가위') ||
      (argUser === '보' && argComputer === '바위')
    ) {
      return 'win'
    } else if (argUser === argComputer) {
      return 'draw'
    } else {
      return 'lose'
    }
  }

  const handleUserChoice = (userChoice) => {
    if (gameOver) return

    const computerChoice = getComputerChoice()
    const result = judge(userChoice, computerChoice)

    let resultText = `당신 : ${userChoice} , 컴퓨터 : ${computerChoice} → `

    if (result === 'win') {
      setUserWins(prev => prev + 1)
      resultText += '승리'
    } else if (result === 'lose') {
      setComputerWins(prev => prev + 1)
      resultText += '패배'
    } else {
      setDraws(prev => prev + 1)
      resultText += '무승부'
    }

    setLog(prevLog => [...prevLog, resultText])

    if (
      userWins + (result === 'win' ? 1 : 0) === 2 ||
      computerWins + (result === 'lose' ? 1 : 0) === 2
    ) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setUserWins(0)
    setComputerWins(0)
    setDraws(0)
    setLog([])
    setGameOver(false)
  }

  return (
    <div className='App'>
      <h1>가위, 바위, 보 게임 (3판 2선승제)</h1>
      <div>
        {options.map((option, idx) => (
          <button key={idx} onClick={() => handleUserChoice(option)} disabled={gameOver}>
            {option}
          </button>
        ))}
      </div>

      <div className='log'>
        <h2>게임 기록</h2>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>

      <div className="result">
        <p>승: {userWins} / 무: {draws} / 패: {computerWins}</p>
        {gameOver && (
          <>
            <h2>최종 결과: {userWins === 2 ? '당신의 승리!' : '컴퓨터의 승리!'}</h2>
            <button onClick={resetGame}>다시 시작</button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
