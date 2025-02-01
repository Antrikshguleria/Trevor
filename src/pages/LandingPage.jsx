import React, { useContext } from "react";
import { ThemeContext } from "../ui/ThemeProvide";

const LandingPage = () => {
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  return (
    <div className="h-screen flex items-center justify-center bg-light-cream dark:bg-dark-navy transition-colors duration-500">
      {/* Main Content */}
      <div className="text-center z-10 relative px-6 md:px-12 lg:px-24">
        {/* Title */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide transition-colors duration-500 ${
            darkMode ? "text-yellow-400" : "text-black"
          }`}
        >
          Trivora
        </h1>

        {/* Creative Button */}
        <div className="mt-12">
          <button
            className={`px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 font-bold text-lg sm:text-xl lg:text-2xl 
            rounded-lg shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all duration-300 
            ${
              darkMode
                ? "bg-[#f5f5dc] text-black" // Light button in dark mode
                : "bg-yellow-400 text-white" // Dark button in light mode
            }`}
            onClick={() => (window.location.href = "/home")}
          >
            Start Your Quiz Adventure!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;