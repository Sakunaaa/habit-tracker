import React from 'react';
import { HabitList } from '@/src/HabitList';
import { Title } from '@mantine/core';
import { MainLayout } from '@/src/MainLayout';
import Head from 'next/head';

// Wywietl date w Title aktualna (dzisiejsza)

const IndexPage = () => {
	return (
		<main>
			<Head>
				<title>HabitTracker</title>
			</Head>
			<Title></Title>
			<HabitList />
		</main>
	);
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};
