import { useState, useEffect } from "react";
import "./Game.css";
import { opponents } from "./Opponents";
import DevTools from "./DevTools";

const choices = [
  { name: "rock", emoji: "🪨", level: 1 },
  { name: "crystal", emoji: "🔮", level: 2 },
  { name: "diamond", emoji: "💎", level: 3 },
  { name: "paper", emoji: "📄", level: 1 },
  { name: "book", emoji: "📔", level: 2 },
  { name: "scroll", emoji: "📜", level: 3 },
  { name: "scissors", emoji: "✂️", level: 1 },
  { name: "knife", emoji: "🔪", level: 2 },
  { name: "sword", emoji: "🗡", level: 3 },
];

const upgrades = {
  rock: ["Crystal 🔮", "Diamond 💎"],
  paper: ["Book 📔", "Scroll 📜"],
  scissors: ["Knife 🔪", "Sword 🗡"],
};

const levels = {
  rock: ["rock", "crystal", "diamond"],
  paper: ["paper", "book", "scroll"],
  scissors: ["scissors", "knife", "sword"],
};

const getLevel = (item) => {
  for (const [key, value] of Object.entries(levels)) {
    const index = value.indexOf(item);
    if (index !== -1) {
      return { type: key, level: index + 1 };
    }
  }
  return null;
};

function Game() {
  const [player, setPlayer] = useState({
    hp: 100,
    gold: 0,
    upgradePoints: 0,
    choice: null,
    upgrades: { rock: 1, paper: 1, scissors: 1 },
  });

  const [opponent, setOpponent] = useState(opponents[0]);
  const [result, setResult] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);

  const handleWin = () => {
    setResult("You Win!");
    setShowVictoryMessage(true);
    setTimeout(() => {
      setShowVictoryMessage(false);
      setNextOpponent();
    }, 2000); // Hide the message after 2 seconds
  };

  const handleLose = () => {
    setResult("You Lose!");
  };

  const handleTie = () => {
    setResult("It's a Tie!");
  };

  const setNextOpponent = () => {
    const currentIndex = opponents.indexOf(opponent);
    const nextIndex = (currentIndex + 1) % opponents.length;
    setOpponent(opponents[nextIndex]);
  };

  const play = (playerChoice) => {
    setPlayer((prevPlayer) => ({ ...prevPlayer, choice: playerChoice }));
    const opponentChoice = choices[Math.floor(Math.random() * choices.length)];
    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      choice: opponentChoice,
    }));

    // Determine the result
    const playerLevel = getLevel(playerChoice.name);
    const opponentLevel = getLevel(opponentChoice.name);

    if (playerLevel.type === opponentLevel.type) {
      if (playerLevel.level > opponentLevel.level) {
        handleWin();
      } else if (playerLevel.level < opponentLevel.level) {
        handleLose();
      } else {
        handleTie();
      }
    } else if (
      (playerLevel.type === "rock" && opponentLevel.type === "scissors") ||
      (playerLevel.type === "scissors" && opponentLevel.type === "paper") ||
      (playerLevel.type === "paper" && opponentLevel.type === "rock")
    ) {
      handleWin();
    } else {
      handleLose();
    }
  };

  return (
    <div className="game-container">
      <div className="player-info">
        <h2>Player</h2>
        <p>HP: {player.hp}</p>
        <p>Gold: {player.gold}</p>
        <p>Upgrade Points: {player.upgradePoints}</p>
        {/* Other player info */}
      </div>
      <div className="game">
        <DevTools onWin={handleWin} onLose={handleLose} onTie={handleTie} />
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
        {player.choice && opponent.choice && (
          <div className="results">
            <p>
              You chose: {player.choice.emoji} {player.choice.name}
            </p>
            <p>
              Opponent chose: {opponent.choice.emoji} {opponent.choice.name}
            </p>
            <p>{result}</p>
          </div>
        )}
      </div>
      <div className="opponent-info">
        <h2>
          Current Opponent: {opponent.emoji} {opponent.name}
        </h2>
        <p>HP: {opponent.hp}</p>
        <p>Gold: {opponent.gold}</p>
        <p>Upgrade Points: {opponent.upgradePoints}</p>
        {opponent.special && <p>Special: {opponent.special}</p>}
      </div>
      {showUpgrade && (
        <div className="upgrade-modal">
          <h2>Level Upgrade!</h2>
          <p>Choose which class to upgrade:</p>
          <button onClick={() => handleUpgrade("rock")}>
            Rock {upgrades.rock[player.upgrades.rock - 1]}
          </button>
          <button onClick={() => handleUpgrade("paper")}>
            Paper {upgrades.paper[player.upgrades.paper - 1]}
          </button>
          <button onClick={() => handleUpgrade("scissors")}>
            Scissors {upgrades.scissors[player.upgrades.scissors - 1]}
          </button>
        </div>
      )}
      {showVictoryMessage && (
        <div className="victory-message">
          <h2>You Win!</h2>
        </div>
      )}
    </div>
  );
}

export default Game;
