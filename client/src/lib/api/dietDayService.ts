import apiClient from './apiClient'

export const dietDayAPI = {
	getAll: async (): Promise<DietDay[]> => {
		const response = await apiClient.get<DietDay[]>('/api/dietdays')
		return response.data
	},

	getById: async (id: string): Promise<DietDay> => {
		const response = await apiClient.get<DietDay>(`/api/dietdays/${id}`)
		return response.data
	},

	getByUserId: async (userId: string): Promise<DietDay[]> => {
		const response = await apiClient.get<DietDay[]>(`/api/dietdays/user/${userId}`)
		return response.data
	},

	create: async (dietDay: Partial<DietDay>): Promise<string> => {
		const response = await apiClient.post<string>('/api/dietdays', dietDay)
		return response.data
	},

	update: async (dietDay: DietDay): Promise<void> => {
		await apiClient.put('/api/dietdays', dietDay)
	},

	delete: async (id: string): Promise<void> => {
		await apiClient.delete(`/api/dietdays/${id}`)
	},
}
