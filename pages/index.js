import { supabaseClient } from '@/src/supabaseClient';
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { Avatar } from '@mantine/core';

// 1. Po odpaleniu "toggleHabit", ponownie wywołujemy "fetchHabits"
// 2. Ręcznie aktualizować "habits", zmieniając wartość is_done danego habita w naszej tablicy
// // 2.1. Przeiterowali po habitach
// // 2.2. Znalezlibysmy habit o danym id
// // 2.3. Zmienilibysmy jego wartosc is_done na przeciwna

const useGetHabits = () => {
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

	return {
		data: habits,
		error: error,
		isFetching: isFetching,
		refetch: fetchHabits,
	};
};

export default function Home() {
	const {
		data: habits,
		error: getHabitsError,
		isFetching: isGetHabitsFetching,
		refetch,
	} = useGetHabits();
	const [isToggleHabitFetching, setIsToggleHabitFetching] = useState(false);
	const [toggleHabitError, setToggleHabitError] = useState(null);

	const toggleHabit = async (currentHabit) => {
		setIsToggleHabitFetching(true);
		const { data, error } = await supabaseClient
			.from('habits')
			.update({ is_done: !currentHabit.is_done })
			.eq('id', currentHabit.id);
		setIsToggleHabitFetching(false);
		if (error === null) {
			refetch();
		} else {
			setToggleHabitError(error.message);
		}
	};

	const isLoading = isGetHabitsFetching && habits.length === 0;
	const error = getHabitsError || toggleHabitError;

	return (
		<main>
			{error && <span>{error}</span>}
			{isLoading && <span>Loading...</span>}

			{habits.map((habit) => (
				<li key={habit.id}>
					<span>{habit.content}</span>{' '}
					<Button
						onClick={() => {
							toggleHabit(habit);
						}}
					>
						{`${habit.is_done}`}
					</Button>{' '}
				</li>
			))}
		</main>
	);
}
