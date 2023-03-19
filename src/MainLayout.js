import React, { useState } from 'react';
import { Avatar, Flex, Text, Container } from '@mantine/core';
import { useEffect } from 'react';
import { supabaseClient } from './supabaseClient';
import { useRouter } from 'next/router';

function Nav(props) {
	return (
		<Flex
			mih={50}
			justify="space-between"
			align="center"
			direction="row"
			wrap="wrap"
			p="md"
		>
			<Avatar
				opacity="0"
				variant="filled"
				radius="xl"
				color="teal"
				src={props.avatar}
			/>
			<Text fz="24px" fw="700">
				Habit
			</Text>
			<Avatar variant="filled" radius="xl" color="teal" src={props.avatar} />
		</Flex>
	);
}

export function MainLayout(props) {
	const [avatar, setAvatar] = useState(
		'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
	);

	const router = useRouter();
	const getUser = async () => {
		const result = await supabaseClient.auth.getUser();
		const isLoggedIn = result.data.user !== null;
		const avatarUrl = result.data.user.user_metadata.avatar_url;
		setAvatar(avatarUrl);
		if (!isLoggedIn) {
			router.push('/login');
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	return (
		<Container size="lg">
			<Nav avatar={avatar} />
			{props.children}
		</Container>
	);
}
