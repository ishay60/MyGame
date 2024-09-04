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
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState("");
  const [currentOpponent, setCurrentOpponent] = useState(opponents[0]);
  const [round, setRound] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [playerUpgrades, setPlayerUpgrades] = useState({
    rock: 1,
    paper: 1,
    scissors: 1,
  });
  const [opponentUpgrades, setOpponentUpgrades] = useState({
    rock: 1,
    paper: 1,
    scissors: 1,
  });
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);

  const clickSound = new Audio("/assets/sounds/click.wav");
  const winSound = new Audio("/assets/sounds/win.wav");
  const loseSound = new Audio("/assets/sounds/lose.mp3");
  const tieSound = new Audio("/assets/sounds/tie.wav");

  useEffect(() => {
    if (currentOpponent.name === "The Sickle" && round > 7) {
      setCurrentOpponent((prev) => ({
        ...prev,
        hp: prev.hp - 2,
      }));
    }
  }, [round]);

  const play = (choice) => {
    clickSound.play();
    const opponentChoices = choices.filter(
      (choice) => choice.level <= opponentUpgrades[choice.name]
    );
    const opponent =
      opponentChoices[Math.floor(Math.random() * opponentChoices.length)];
    setPlayerChoice(choice);
    setOpponentChoice(opponent);
    determineWinner(choice.name, opponent.name);
    setRound((prev) => prev + 1);
  };

  const determineWinner = (player, opponent) => {
    const playerLevel = getLevel(player);
    const opponentLevel = getLevel(opponent);

    if (playerLevel.type === opponentLevel.type) {
      if (playerLevel.level === opponentLevel.level) {
        setResult("It's a tie! 🤝");
        tieSound.play();
        if (currentOpponent.name === "The Mom") {
          setCurrentOpponent((prev) => ({
            ...prev,
            hp: prev.hp + 2,
          }));
        }
      } else if (playerLevel.level > opponentLevel.level) {
        setResult("You win! 🎉");
        winSound.play();
        setCurrentOpponent((prev) => ({
          ...prev,
          hp: prev.hp - 1,
        }));
        if (currentOpponent.hp <= 0) {
          setShowUpgrade(true);
          setShowVictoryMessage(true);
          setTimeout(() => {
            setShowVictoryMessage(false);
            changeOpponent();
          }, 2000);
        }
      } else {
        setResult("You lose! 😢");
        loseSound.play();
      }
    } else {
      const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper",
      };

      if (winConditions[playerLevel.type] === opponentLevel.type) {
        if (playerLevel.level >= opponentLevel.level) {
          setResult("You win! 🎉");
          winSound.play();
          setCurrentOpponent((prev) => ({
            ...prev,
            hp: prev.hp - 1,
          }));
          if (currentOpponent.hp <= 0) {
            setShowUpgrade(true);
            setShowVictoryMessage(true);
            setTimeout(() => {
              setShowVictoryMessage(false);
              changeOpponent();
            }, 2000);
          }
        } else {
          setResult("It's a tie! 🤝");
          tieSound.play();
          if (currentOpponent.name === "The Mom") {
            setCurrentOpponent((prev) => ({
              ...prev,
              hp: prev.hp + 2,
            }));
          }
        }
      } else if (winConditions[opponentLevel.type] === playerLevel.type) {
        if (opponentLevel.level >= playerLevel.level) {
          setResult("You lose! 😢");
          loseSound.play();
        } else {
          setResult("It's a tie! 🤝");
          tieSound.play();
          if (currentOpponent.name === "The Mom") {
            setCurrentOpponent((prev) => ({
              ...prev,
              hp: prev.hp + 2,
            }));
          }
        }
      } else {
        setResult("You lose! 😢");
        loseSound.play();
      }
    }
  };

  const handleUpgrade = (type) => {
    setPlayerUpgrades((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setShowUpgrade(false);
  };

  const changeOpponent = () => {
    const nextOpponentIndex =
      opponents.findIndex(
        (opponent) => opponent.name === currentOpponent.name
      ) + 1;
    if (nextOpponentIndex < opponents.length) {
      setCurrentOpponent(opponents[nextOpponentIndex]);
    } else {
      setCurrentOpponent(opponents[0]); // Loop back to the first opponent
    }
  };

  const filteredChoices = choices.filter(
    (choice) => choice.level <= playerUpgrades[choice.name]
  );

  const handleWin = () => {
    setResult("You win! 🎉");
    winSound.play();
    setCurrentOpponent((prev) => ({
      ...prev,
      hp: prev.hp - 1,
    }));
    if (currentOpponent.hp <= 0) {
      setShowUpgrade(true);
      setShowVictoryMessage(true);
      setTimeout(() => {
        setShowVictoryMessage(false);
        changeOpponent();
      }, 2000);
    }
  };

  const handleLose = () => {
    setResult("You lose! 😢");
    loseSound.play();
  };

  const handleTie = () => {
    setResult("It's a tie! 🤝");
    tieSound.play();
    if (currentOpponent.name === "The Mom") {
      setCurrentOpponent((prev) => ({
        ...prev,
        hp: prev.hp + 2,
      }));
    }
  };

  return (
    <div className="game">
      <DevTools onWin={handleWin} onLose={handleLose} onTie={handleTie} />
      <div className="result-message">{result}</div>
      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        {filteredChoices.map((choice) => (
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
      <div className="opponent-info">
        <h2>
          Current Opponent: {currentOpponent.emoji} {currentOpponent.name}
        </h2>
        <p>HP: {currentOpponent.hp}</p>
        <p>Gold: {currentOpponent.gold}</p>
        <p>Upgrade Points: {currentOpponent.upgradePoints}</p>
        {currentOpponent.special && <p>Special: {currentOpponent.special}</p>}
      </div>
      {showUpgrade && (
        <div className="upgrade-modal">
          <h2>Level Upgrade!</h2>
          <p>Choose which class to upgrade:</p>
          <button onClick={() => handleUpgrade("rock")}>
            Rock {upgrades.rock[playerUpgrades.rock - 1]}
          </button>
          <button onClick={() => handleUpgrade("paper")}>
            Paper {upgrades.paper[playerUpgrades.paper - 1]}
          </button>
          <button onClick={() => handleUpgrade("scissors")}>
            Scissors {upgrades.scissors[playerUpgrades.scissors - 1]}
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
