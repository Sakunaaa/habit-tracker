import React from 'react';
import { Tasks } from '@/src/Tasks';
import { Title } from '@mantine/core';
import { MainLayout } from '@/src/MainLayout';
import { AuthLayout } from '@/src/AuthLayout';
import Head from 'next/head';

// Wywietl date w Title aktualna (dzisiejsza)

const IndexPage = () => {
	return (
		<main>
			<Head>
				<title>HabitTracker</title>
			</Head>
			<Title></Title>
			<Tasks />
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
