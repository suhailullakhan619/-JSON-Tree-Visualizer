import React from "react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider"></span>
      </label>
      <span>{darkMode ? "Dark" : "Light"}</span>
    </div>
  );
}
