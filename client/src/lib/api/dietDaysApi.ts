import apiClient from './client';

export const dietDaysApi = {
	getAll: async (): Promise<DietDay[]> => {
		const response = await apiClient.get<DietDay[]>('/dietdays');
		return response.data;
	},

	getById: async (id: string): Promise<DietDay> => {
		const response = await apiClient.get<DietDay>(`/dietdays/${id}`);
		return response.data;
	},

	create: async (dietDay: DietDay): Promise<string> => {
		const response = await apiClient.post<string>('/dietdays', dietDay);
		return response.data;
	},

	update: async (dietDay: DietDay): Promise<void> => {
		await apiClient.put('/dietdays', dietDay);
	},

	delete: async (id: string): Promise<void> => {
		await apiClient.delete(`/dietdays/${id}`);
	},
};
