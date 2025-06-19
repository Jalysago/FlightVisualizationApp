import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      console.log('useEffect triggered in AuthContext'); // Debug
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return; 
      }

      try {
        console.log('Sending request to /me...', response.data); // Debug
        const response = await axios.get('http://localhost:3001/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log('Fetched User from /me:', response.data); // Debug
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user from /me', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/users/login',
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log('Login response:', response.data);

      const { token, userEmail } = response.data;

      if (token) {
        localStorage.setItem('token', token);
      }

      const userData = userEmail.rows[0];
      setUser(userData);
      return response.data;

    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      if (token) {
        await axios.post('http://localhost:3001/users/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;