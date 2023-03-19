import React from 'react';
import { Avatar, Flex, Text, Container } from '@mantine/core';
import { useContext } from 'react';
import { UserContext } from './AuthLayout';

function Nav() {
	const user = useContext(UserContext);

	const avatar = user ? user.user_metadata.avatar_url : '';

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
				src={avatar}
			/>
			<Text fz="24px" fw="700">
				Habit
			</Text>
			<Avatar variant="filled" radius="xl" color="teal" src={avatar} />
		</Flex>
	);
}

export function MainLayout(props) {
	return (
		<Container size="lg">
			<Nav />
			{props.children}
		</Container>
	);
}
