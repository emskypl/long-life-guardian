import { useState, useEffect } from 'react';
import { authApi, type LoginRequest, type RegisterRequest, type UserDto } from '../lib/api/authApi';

export const useAuth = () => {
	const [user, setUser] = useState<UserDto | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Load user from localStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (error) {
				console.error('Failed to parse stored user:', error);
				localStorage.removeItem('user');
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (credentials: LoginRequest) => {
		const userData = await authApi.login(credentials);
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('token', userData.token);
		setUser(userData);
		return userData;
	};

	const register = async (data: RegisterRequest) => {
		const userData = await authApi.register(data);
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('token', userData.token);
		setUser(userData);
		return userData;
	};

	const logout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		setUser(null);
	};

	return {
		user,
		isLoading,
		isAuthenticated: !!user,
		login,
		register,
		logout,
	};
};
