import React from 'react';
import 'animate.css';

const LandingPage = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">

      {/* Main Content */}
      <div className="text-center text-white z-10 relative">
        {/* Animated Title with Word-by-Word Animation */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide text-white">
          <span className="inline-block animate__animated animate__fadeIn animate__delay-1s">T</span>
          <span className="inline-block animate__animated animate__fadeIn animate__delay-2s">r</span>
          <span className="inline-block animate__animated animate__fadeIn animate__delay-3s">i</span>
          <span className="inline-block animate__animated animate__fadeIn animate__delay-4s">v</span>
          <span className="inline-block animate__animated animate__fadeIn animate__delay-5s">o</span>
          <span className="inline-block animate__animated animate__fadeIn animate__delay-6s">r</span>
          <span className="inline-block animate__animated animate__fadeIn animate__delay-7s">a</span>
        </h1>

        {/* Creative Button */}
        <div className="mt-12">
          <button
            className="px-12 py-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 font-bold text-2xl rounded-lg shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all duration-300"
            onClick={() => window.location.href = '/home'} // Redirect to the quiz page
          >
            Start Your Quiz Adventure!
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;