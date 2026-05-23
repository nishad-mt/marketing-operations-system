import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('access');

            if (storedUser && token) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = (userData, accessToken, refreshToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        setUser(userData);
        navigate('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
