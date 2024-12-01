import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/users/register', formData);
            setSuccess('Registration successful');
            setTimeout(() => navigate('http://localhost:3000/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4" >Register</h2>
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
                <label htmlFor="username" className="block text-gray-700">Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                />
                <div className="mt-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
                

                <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                    Register
                </button>
            </form>
            <p className="text-sm text-center mt-4">
                Already have an account? &nbsp; 
                <a href="http://localhost:3000/login" className="text-blue-500">
                Login
                </a>
            </p>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
        </div>
    );    
};

export default RegisterPage;