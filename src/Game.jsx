import { useState } from "react";
import "./Game.css";

const choices = [
  { name: "rock", emoji: "🪨" },
  { name: "paper", emoji: "📄" },
  { name: "scissors", emoji: "✂️" },
];

function Game() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState("");

  const clickSound = new Audio("/assets/sounds/click.wav");
  const winSound = new Audio("/assets/sounds/win.wav");
  const loseSound = new Audio("/assets/sounds/lose.mp3");
  const tieSound = new Audio("/assets/sounds/tie.wav");

  const play = (choice) => {
    clickSound.play();
    const opponent = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setOpponentChoice(opponent);
    determineWinner(choice.name, opponent.name);
  };

  const determineWinner = (player, opponent) => {
    if (player === opponent) {
      setResult("It's a tie! 🤝");
      tieSound.play();
    } else if (
      (player === "rock" && opponent === "scissors") ||
      (player === "paper" && opponent === "rock") ||
      (player === "scissors" && opponent === "paper")
    ) {
      setResult("You win! 🎉");
      winSound.play();
    } else {
      setResult("You lose! 😢");
      loseSound.play();
    }
  };

  return (
    <div className="game">
      <div className="result-message">{result}</div>
      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => play(choice)}
            className="choice-button"
          >
            {choice.emoji} {choice.name}
          </button>
        ))}
      </div>
      {playerChoice && (
        <div className="results">
          <p>
            You chose: {playerChoice.emoji} {playerChoice.name}
          </p>
          <p>
            Opponent chose: {opponentChoice.emoji} {opponentChoice.name}
          </p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default Game;
