/* eslint-disable react/no-unescaped-entities */
import { supabaseClient } from '@/src/supabaseClient';
import { useEffect, useState } from 'react';
import {
	ActionIcon,
	Button,
	Stack,
	Flex,
	Container,
	Checkbox,
	Text,
	Title,
} from '@mantine/core';
import { Month, DatePicker } from '@mantine/dates';
import { useContext } from 'react';
import { UserContext } from './AuthLayout';
import { useGetTasks } from './hooks';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

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
			.from('tasks')
			.update({ checked: !currentTask.checked })
			.eq('id', currentTask.id);
		setIsToggleTaskFetching(false);
		if (error === null) {
			refetch();
		} else {
			setToggleTaskError(error.message);
		}
	};

	const isLoading = isGetTasksFetching && !tasks.length;
	const isEmpty = tasks.length === 0;
	const error = getTasksError || toggleTaskError;

	const [date, setDate] = useState(new Date());

	const today = getTodayDate();

	return (
		<Container size="sm" component="section">
			<Stack align="center">
				<Title order={1}>{today}</Title>
				<Month month={date} value={date} onChange={setDate} />
				{error && <span>{error}</span>}
				{isLoading && <span>Loading...</span>}
				{isEmpty && <span>No tasks found.</span>}
				<Flex gap="lg" align="center">
					<Text
						fw={500}
						sx={{ letterSpacing: 1.05 }}
						fz="lg"
						tt="uppercase"
					>{`${tasks.length} Habits`}</Text>
					<Link href="/new-habit">
						<ActionIcon color="primary" variant="outline">
							<IconPlus size="1.125rem" />
						</ActionIcon>
					</Link>
				</Flex>
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
							<Text td={task.checked ? 'line-through' : 'none'}>
								{task.habits.content}
							</Text>
							<Flex align="center" gap="lg">
								<Checkbox
									size="xl"
									checked={task.checked}
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
