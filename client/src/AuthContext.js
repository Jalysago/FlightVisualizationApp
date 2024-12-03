import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users/me', {
                    withCredentials: true,
                });
                setUser(response.data); 
            } catch (err) {
                setUser(null); 
            }
        };

        checkSession();
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', credentials, {
                withCredentials: true,
            });
            setUser(response.data);
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