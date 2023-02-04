import React from 'react';
import { HabitList } from '@/src/HabitList';
import { Title } from '@mantine/core';

// Wywietl date w Title aktualna (dzisiejsza)

const IndexPage = () => {
	return (
		<main>
			<Title></Title>
			<HabitList />
		</main>
	);
};

export default IndexPage;
