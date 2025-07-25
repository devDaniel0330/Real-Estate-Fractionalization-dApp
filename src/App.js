import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <h1>Fractional Property Platform</h1>
      
      {showLogin ? <Login /> : <Register />}

      <p>
        {showLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setShowLogin(!showLogin)} style={{ marginLeft: '10px' }}>
          {showLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default App;
