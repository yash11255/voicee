import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';

const moviesData = [
  {
    id: 1,
    title: "jawangfgdhg",
    poster_path: "/path/to/image.jpg",
    trailerKey: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "jawan",
    poster_path: "/path/to/image2.jpg",
    trailerKey: "anotherVideoID"
  }
];

function App() {
  useEffect(() => {
    if (!localStorage.getItem("movies")) {
      localStorage.setItem("movies", JSON.stringify(moviesData));
    }
  }, []); // Runs once when the app starts

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;