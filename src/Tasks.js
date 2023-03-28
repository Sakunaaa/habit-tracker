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
import { useGetTasks } from './hooks';

// 1. Po kliknieciu przycisku "Add task" pojawia nam sie input nazwy habita (state boolean np isTaskFormShowing)
// 2. Formularz ma sie submitowac na klikniecie Entera
// 3. Na submit wysyla sie zapytanie do SupaBase o utworzenie nowego habita
// 4. Po udanym utworzeniu habita pobierz ponownie liste habitow oraz wyczysc formularz

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

export function Tasks() {
	const user = useContext(UserContext);
	const {
		data: tasks,
		error: getTasksError,
		isFetching: isGetTasksFetching,
		refetch,
	} = useGetTasks();
	const [isToggleTaskFetching, setIsToggleTaskFetching] = useState(false);
	const [toggleTaskError, setToggleTaskError] = useState(null);

	const toggleTask = async (currentTask) => {
		setIsToggleTaskFetching(true);
		const { data, error } = await supabaseClient
			.from('old_habits')
			.update({ is_done: !currentTask.is_done })
			.eq('id', currentTask.id);
		setIsToggleTaskFetching(false);
		if (error === null) {
			refetch();
		} else {
			setToggleTaskError(error.message);
		}
	};

	const isLoading = isGetTasksFetching;
	const isEmpty = tasks.length === 0;
	const error = getTasksError || toggleTaskError;

	const [value, setValue] = useState(new Date());

	const today = getTodayDate();

	return (
		<Container size="sm" component="section">
			<Stack align="center">
				<Title order={1}>{today}</Title>
				<Month month={value} value={value} onChange={setValue} />
				{error && <span>{error}</span>}
				{isLoading && <span>Loading...</span>}
				{isEmpty && <span>No tasks found.</span>}
				<Stack style={{ width: '100%' }}>
					{tasks.map((task) => (
						<Flex
							key={task.id}
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
							<Text td={task.is_done ? 'line-through' : 'none'}>
								{task.habits.content}
							</Text>
							<Flex align="center" gap="lg">
								<Checkbox
									size="xl"
									checked={task.is_done}
									onChange={() => {
										toggleTask(task);
									}}
								/>
							</Flex>
						</Flex>
					))}
				</Stack>
			</Stack>
		</Container>
	);
}
