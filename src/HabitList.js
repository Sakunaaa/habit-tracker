/* eslint-disable react/no-unescaped-entities */
import { supabaseClient } from '@/src/supabaseClient';
import { useEffect, useState } from 'react';
import {
	Button,
	Stack,
	Flex,
	Container,
	ActionIcon,
	Checkbox,
	Text,
	Title,
} from '@mantine/core';
import { Month, DatePicker } from '@mantine/dates';
import { useContext } from 'react';
import { UserContext } from './AuthLayout';

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

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const getTodayDate = () => {
	const today = new Date();
	// Poniedziałek, 26 stycznia 2023
	const [day, year] = [today.getDate(), today.getFullYear()];
	const month = today.toLocaleString('pl-pl', { month: 'long' });
	const weekday = today.toLocaleString('pl-pl', { weekday: 'long' });

	return `${capitalize(weekday)}, ${day} ${capitalize(month)} ${year}`;
};

export function HabitList() {
	const user = useContext(UserContext);
	const {
		data: habits,
		error: getHabitsError,
		isFetching: isGetHabitsFetching,
		refetch,
	} = useGetHabits();
	const [isToggleHabitFetching, setIsToggleHabitFetching] = useState(false);
	const [toggleHabitError, setToggleHabitError] = useState(null);

	const addNewHabit = async (currentHabit) => {
		const { data, error } = await supabaseClient
			.from('habits')
			.insert([{ is_done: false, content: 'pedro', user_id: user.id }]);
	};

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
	const [isDeleteHabitFetching, setIsDeleteHabitFetching] = useState(false);
	const [deleteHabitError, setDeleteHabitError] = useState(null);

	const deleteHabit = async (currentHabit) => {
		setIsDeleteHabitFetching(true);
		const { data, error } = await supabaseClient
			.from('habits')
			.delete()
			.eq('id', currentHabit.id);
		setIsDeleteHabitFetching(false);
		if (error === null) {
			refetch();
		} else {
			setDeleteHabitError(error.message);
		}
	};

	const isLoading = isGetHabitsFetching;
	const isEmpty = habits.length === 0;
	const error = getHabitsError || toggleHabitError;

	const [value, setValue] = useState(new Date());

	const today = getTodayDate();

	return (
		<Container size="sm" component="section">
			<Stack align="center">
				<Title order={1}>{today}</Title>
				<Month month={value} value={value} onChange={setValue} />
				{error && <span>{error}</span>}
				{isLoading && <span>Loading...</span>}
				{isEmpty && <span>No habits found.</span>}
				<Stack style={{ width: '100%' }}>
					{habits.map((habit) => (
						<Flex
							key={habit.id}
							bg="dark.6"
							p="sm"
							align="center"
							justify="space-between"
							sx={(theme) => ({
								color: theme.colors.gray[0],
								'&:hover': {
									backgroundColor: theme.colors.dark[5],
								},
							})}
						>
							<Text td={habit.is_done ? 'line-through' : 'none'}>
								{habit.content}
							</Text>
							<Flex align="center" gap="lg">
								<Checkbox
									size="xl"
									checked={habit.is_done}
									onChange={() => {
										toggleHabit(habit);
									}}
								/>
								<Button
									variant="outline"
									onClick={() => {
										deleteHabit(habit);
									}}
									sx={(theme) => ({
										'&:hover': {
											borderColor: theme.colors.red[7],
										},
									})}
								>
									🗑
								</Button>
							</Flex>
						</Flex>
					))}
				</Stack>
				<Button onClick={addNewHabit}>Add new habit</Button>
			</Stack>
		</Container>
	);
}
