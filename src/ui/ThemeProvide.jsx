import React, { useState, useEffect, createContext } from "react";
import ToggleMode from "./ToggleMode";

// Create ThemeContext
export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        className={`min-h-screen relative transition-colors duration-300 ${
          darkMode ? "bg-dark-navy" : "bg-light-cream"
        }`}
      >
        {/* Background Images - This is now at the lowest level */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Dark Image */}
          <img
            src="/pattern-background-desktop-dark.svg"
            alt="pattern img"
            className={`hidden lg:block absolute inset-0 transition-all duration-300 ${
              darkMode ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Desktop Light Image */}
          <img
            src="/pattern-background-desktop-light.svg"
            alt="pattern img"
            className={`hidden lg:block absolute inset-0 transition-all duration-300 ${
              darkMode ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Tablet Dark Image */}
          <img
            src="/pattern-background-tablet-dark.svg"
            alt="pattern img"
            className={`hidden md:block absolute inset-0 transition-all duration-300 ${
              darkMode ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Tablet Light Image */}
          <img
            src="/pattern-background-tablet-light.svg"
            alt="pattern img"
            className={`hidden md:block absolute inset-0 transition-all duration-300 ${
              darkMode ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Mobile Image */}
          <img
            src="/pattern-background-mobile-dark.svg"
            alt="pattern img"
            className={`block md:hidden absolute inset-0 transition-all duration-300 ${
              darkMode ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Mobile Light Image */}
          <img
            src="/pattern-background-mobile-light.svg"
            alt="pattern img"
            className={`block md:hidden absolute inset-0 transition-all duration-300 ${
              darkMode ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* The rest of the content */}
        <div className="relative z-10">
          <ToggleMode darkMode={darkMode} setDarkMode={setDarkMode} />
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;