import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import FavoritesPage from './components/FavoritesPage';
import Header from './components/Header';
import HomePage from './components/HomePage'

const App = () => {
  const [flights, setFlights] = useState([]);

  
  
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/home" element={ <HomePage/>}/>
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/favorites" element={ <FavoritesPage/> } />
        </Routes>
        <p>Your next adventure starts here!</p>
    </Router>
    
  );
}

export default App;