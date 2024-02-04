import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Update the import statement
import Main from './Component/Main';
import Signup from './Component/Signup';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>  {/* Replace Switch with Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;