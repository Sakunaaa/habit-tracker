import React from 'react';
import { HabitList } from '@/src/HabitList';
import { Title } from '@mantine/core';
import { MainLayout } from '@/src/MainLayout';
import { AuthLayout } from '@/src/AuthLayout';

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

IndexPage.getLayout = function getLayout(page) {
	return (
		<AuthLayout>
			<MainLayout>{page}</MainLayout>
		</AuthLayout>
	);
};
