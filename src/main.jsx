import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// src/index.js or a similar entry point
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  // Function to set aspect ratio class
  function setAspectRatio(aspectRatio) {
    rootElement.classList.remove("aspect-16-9", "aspect-5-4");
    rootElement.classList.add(aspectRatio);
  }

  // Detect device type (simple example, can be more complex)
  const isPC = window.innerWidth > 768; // Example condition for PC

  if (isPC) {
    setAspectRatio("aspect-16-9");
  } else {
    setAspectRatio("aspect-5-4");
  }

  // Button to toggle aspect ratio
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "16:9/5:4";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "10px";
  toggleButton.style.right = "10px";
  toggleButton.style.padding = "10px 20px";
  toggleButton.style.backgroundColor = "#007BFF";
  toggleButton.style.color = "#FFF";
  toggleButton.style.border = "none";
  toggleButton.style.borderRadius = "5px";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  toggleButton.style.fontSize = "16px";
  toggleButton.style.zIndex = "1000";
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    if (rootElement.classList.contains("aspect-16-9")) {
      setAspectRatio("aspect-5-4");
    } else {
      setAspectRatio("aspect-16-9");
    }
  });
});