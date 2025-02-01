import React from "react";

function ToggleMode({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };

  return (
    <div className="fixed top-4 right-4 z-10 flex items-center gap-6">
      {/* Sun/Moon Icons based on darkMode */}
      {darkMode ? (
        <img src="/icon-sun-light.svg" alt="sun icon" />
      ) : (
        <img src="/icon-sun-dark.svg" alt="sun icon" />
      )}

      <label
        htmlFor="toggle"
        className={`relative block h-[2.4rem] w-[4.4rem] cursor-pointer rounded-full transition-all duration-300 ${
          darkMode ? "bg-blue-600" : "bg-gray-400" // Change background based on theme
        }`}
      >
        <input
          type="checkbox"
          id="toggle"
          className="hidden"
          checked={darkMode}
          onChange={toggleTheme}
        />
        <div
          className={`absolute left-1 top-[3px] h-[1.8rem] w-[1.8rem] rounded-full bg-white transition-all duration-300 ${
            darkMode ? "translate-x-full" : "translate-x-0" // Handle position based on theme
          }`}
        ></div>
      </label>

      {darkMode ? (
        <img src="/icon-moon-light.svg" alt="moon icon" />
      ) : (
        <img src="/icon-moon-dark.svg" alt="moon icon" />
      )}
    </div>
  );
}

export default ToggleMode;