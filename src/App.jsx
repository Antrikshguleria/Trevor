import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import ThemeProvider from './ui/ThemeProvide';

const App = () => {
  return (
      <Router>
      <ThemeProvider>
      <div className="app">
        <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;