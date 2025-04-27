import { useState } from 'react';
import './App.css'; // Styling will be added separately

function App() {
  const [target] = useState(Math.floor(Math.random() * 10) + 1); // random 1-10
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [chances, setChances] = useState(3); // Only 3 chances
  const [gameOver, setGameOver] = useState(false);

  const checkGuess = () => {
    if (gameOver) return; // Prevent guessing after game over

    const userGuess = parseInt(guess);

    if (isNaN(userGuess)) {
      setMessage('❗ Please enter a valid number.');
      return;
    }

    if (userGuess === target) {
      setMessage('🎉 Congratulations! You guessed it right!');
      setGameOver(true);
    } else {
      const newChances = chances - 1;
      if (newChances === 0) {
        setMessage(`💔 You've lost! The number was ${target}.`);
        setGameOver(true);
      } else {
        setMessage(userGuess > target ? '📈 Too high! Try again.' : '📉 Too low! Try again.');
        setChances(newChances);
      }
    }
    setGuess('');
  };

  const restartGame = () => {
    window.location.reload(); // Simple reload for now
  };

  return (
    <div className="app">
      <h1>🎯 Guess the Number</h1>
      <p className="instructions">Guess a number between 1 and 10.</p>
      <p className="chances">Chances left: {chances}</p>

      <div className="input-group">
        <input 
          type="number" 
          value={guess} 
          onChange={(e) => setGuess(e.target.value)} 
          placeholder="Enter your guess"
          disabled={gameOver}
        />
        <button onClick={checkGuess} disabled={gameOver}>Guess</button>
      </div>

      <p className="message">{message}</p>

      {gameOver && (
        <button className="restart-btn" onClick={restartGame}>
          🔄 Play Again
        </button>
      )}
    </div>
  );
}

export default App;
