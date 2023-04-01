import React from 'react';
import { MainLayout } from '@/src/MainLayout';
import { AuthLayout } from '@/src/AuthLayout';
import Head from 'next/head';

const NewHabitPage = () => {
	return (
		<main>
			<Head>
				<title>Add new habit</title>
			</Head>
			<h1>Add new habit</h1>
		</main>
	);
};

export default NewHabitPage;

NewHabitPage.getLayout = function getLayout(page) {
	return (
		<AuthLayout>
			<MainLayout>{page}</MainLayout>
		</AuthLayout>
	);
};
