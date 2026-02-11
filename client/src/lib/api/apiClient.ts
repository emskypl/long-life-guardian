import axios from 'axios'

// API Base URL Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5002'

// Create axios instance with default configuration
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
	config => {
		const user = localStorage.getItem('user')
		if (user) {
			try {
				const parsedUser = JSON.parse(user)
				if (parsedUser.token) {
					config.headers.Authorization = `Bearer ${parsedUser.token}`
				}
			} catch (error) {
				console.error('Error parsing user token:', error)
			}
		}
		return config
	},
	error => Promise.reject(error),
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			// Handle unauthorized - clear user and redirect to login
			localStorage.removeItem('user')
			window.location.href = '/'
		}
		return Promise.reject(error)
	},
)

export default apiClient
