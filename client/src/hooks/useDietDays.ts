import { useState, useEffect } from 'react';
import { dietDaysApi } from '../lib/api/dietDaysApi';

export const useDietDays = (isAuthenticated: boolean = true) => {
	const [dietDays, setDietDays] = useState<DietDay[]>([]);
	const [selectedDietDay, setSelectedDietDay] = useState<DietDay | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchDietDays = async () => {
		if (!isAuthenticated) {
			setDietDays([]);
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			setError(null);
			const data = await dietDaysApi.getAll();
			setDietDays(data);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to fetch diet days';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchDietDays();
	}, [isAuthenticated]);

	const createDietDay = async (dietDay: DietDay) => {
		try {
			setError(null);
			await dietDaysApi.create(dietDay);
			await fetchDietDays();
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to create diet day';
			setError(errorMessage);
			throw err;
		}
	};

	const updateDietDay = async (dietDay: DietDay) => {
		try {
			setError(null);
			await dietDaysApi.update(dietDay);
			await fetchDietDays();
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to update diet day';
			setError(errorMessage);
			throw err;
		}
	};

	const deleteDietDay = async (id: string) => {
		try {
			setError(null);
			await dietDaysApi.delete(id);
			setDietDays((prev) => prev.filter((d) => d.id !== id));
			if (selectedDietDay?.id === id) {
				setSelectedDietDay(undefined);
			}
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to delete diet day';
			setError(errorMessage);
			throw err;
		}
	};

	const selectDietDay = (dietDay: DietDay | undefined) => {
		setSelectedDietDay(dietDay);
	};

	return {
		dietDays,
		selectedDietDay,
		isLoading,
		error,
		fetchDietDays,
		createDietDay,
		updateDietDay,
		deleteDietDay,
		selectDietDay,
	};
};
