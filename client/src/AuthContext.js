import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            console.log('useEffect triggered in AuthContext'); // Debug
            try {
                 console.log('Sending request to /me...'); // 
                const response = await axios.get('http://localhost:3001/users/me', {
                    withCredentials: true,
                });
                console.log('Fetched User from /me:', response.data); // Debug
                setUser(response.data); 
            } catch (err) {
                console.error('Error fetching user from /me', err);
                setUser(null); 
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', credentials, {
                withCredentials: true,
            });
            setUser(response.data.user);
            console.log(response.data.user);
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
            }
        } catch (err) {
            console.error('Login failed', err);
            throw err;
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/users/logout', {}, {
                withCredentials: true,
            });
            setUser(null);
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;