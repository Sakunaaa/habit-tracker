import { supabaseClient } from '@/src/supabaseClient';
import { useEffect, useState } from 'react';

// 1. Po odpaleniu "toggleHabit", ponownie wywołujemy "fetchHabits"
// 2. Ręcznie aktualizować "habits", zmieniając wartość is_done danego habita w naszej tablicy
// // 2.1. Przeiterowali po habitach
// // 2.2. Znalezlibysmy habit o danym id
// // 2.3. Zmienilibysmy jego wartosc is_done na przeciwna

export default function Home() {
	const [habits, setHabits] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);

	const fetchHabits = async () => {
		setIsFetching(true);
		const { data: habits, error } = await supabaseClient
			.from('habits')
			.select('*');
		setHabits(habits);
		setIsFetching(false);
		if (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchHabits();
	}, []);

	const toggleHabit = async (currentHabit) => {
		const { data, error } = await supabaseClient
			.from('habits')
			.update({ is_done: !currentHabit.is_done })
			.eq('id', currentHabit.id);
		if (error === null) {
			fetchHabits();
		}
	};

	const isLoading = isFetching && habits.length === 0;

	return (
		<main>
			{error && <span>{error}</span>}
			{isLoading && <span>Loading...</span>}
			{habits.map((habit) => (
				<li key={habit.id}>
					<span>{habit.content}</span>{' '}
					<button
						onClick={() => {
							toggleHabit(habit);
						}}
					>{`${habit.is_done}`}</button>{' '}
				</li>
			))}
		</main>
	);
}
