import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import StudentInputPage from './pages/StudentInputPage';
import Login from './pages/Login'; // Import the Login component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/StudentInputPage" element={<StudentInputPage />} />
        <Route path="/Login" element={<Login />} /> {/* Add the Login route */}
      </Routes>
    </Router>
  );
};

export default App;
