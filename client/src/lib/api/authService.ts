import apiClient from './apiClient'

export interface LoginCredentials {
	login: string
	password: string
}

export interface RegisterData {
	login: string
	password: string
	email: string
	username: string
}

export const authAPI = {
	login: async (credentials: LoginCredentials): Promise<User> => {
		const response = await apiClient.post<User>('/api/login/login', credentials)
		return response.data
	},

	register: async (data: RegisterData): Promise<User> => {
		const response = await apiClient.post<User>('/api/login/register', data)
		return response.data
	},
}
