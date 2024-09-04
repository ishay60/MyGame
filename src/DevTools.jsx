import { useState } from "react";
import PropTypes from "prop-types";
import "./DevTools.css";

function DevTools({ onWin, onLose, onTie }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === "devtools") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="devtools">
      {!isAuthenticated ? (
        <div className="password-input">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      ) : (
        <div className="dev-buttons">
          <button onClick={onWin}>Win</button>
          <button onClick={onLose}>Lose</button>
          <button onClick={onTie}>Tie</button>
        </div>
      )}
    </div>
  );
}

DevTools.propTypes = {
  onWin: PropTypes.func.isRequired,
  onLose: PropTypes.func.isRequired,
  onTie: PropTypes.func.isRequired,
};

export default DevTools;
