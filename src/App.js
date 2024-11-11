import React, { useState } from 'react';
import axios from 'axios';

import { AuthProvider } from './auth/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/${username}`);
      setGreeting(response.data.message);
    } catch (error) {
      console.error('Error fetching greeting:', error);
      setGreeting('Error fetching greeting');
    }
  };

  return (
    <div className="App">
      <h1>Hello World</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
      {greeting && <p>{greeting}</p>}
    </div>
  );
}

export default App;