import { useState, useEffect } from 'react';
import { supabaseClient } from './supabaseClient';

export const useGetTasks = () => {
	const [habits, setHabits] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);

	const fetchHabits = async () => {
		setIsFetching(true);
		const { data: habits, error } = await supabaseClient
			.from('tasks')
			.select('id, checked, habits ( content )');
		setHabits(habits);
		setIsFetching(false);
		if (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchHabits();
	}, []);

	return {
		data: habits,
		error: error,
		isFetching: isFetching,
		refetch: fetchHabits,
	};
};
