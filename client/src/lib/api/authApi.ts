import apiClient from './client';

export interface LoginRequest {
	login: string;
	password: string;
}

export interface RegisterRequest {
	login: string;
	password: string;
	email: string;
	username: string;
}

export interface UserDto {
	userId: string;
	username: string;
	token: string;
	email: string;
}

export const authApi = {
	login: async (data: LoginRequest): Promise<UserDto> => {
		const response = await apiClient.post<UserDto>('/login/login', data);
		return response.data;
	},

	register: async (data: RegisterRequest): Promise<UserDto> => {
		const response = await apiClient.post<UserDto>('/login/register', data);
		return response.data;
	},
};
