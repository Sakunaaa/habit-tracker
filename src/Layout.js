import React from 'react';
import { Avatar, Flex } from '@mantine/core';

export function Layout(props) {
	return (
		<div>
			<Flex
				mih={50}
				justify="flex-end"
				align="center"
				direction="row"
				wrap="wrap"
				p="md"
			>
				<Avatar
					variant="filled"
					radius="xl"
					color="teal"
					src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
				/>
			</Flex>
			{props.children}
		</div>
	);
}
