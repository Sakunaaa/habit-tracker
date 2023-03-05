import { Button, Container, Box, Text, Flex } from '@mantine/core';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const Login = () => {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	async function signInWithGitHub() {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'github',
		});
		console.log(data);
	}
	console.log(user);
	return (
		<Flex h="100%" align="center" justify="center">
			<Box
				sx={(theme) => ({
					borderRadius: theme.radius.sm,
				})}
				bg="dark.6"
				shadow="sm"
				p="xl"
			>
				<Flex direction="column" gap="lg" align="center" justify="center">
					<Text>Login</Text>
					<Button onClick={() => signInWithGitHub()}>Log in with GitHub</Button>
				</Flex>
			</Box>
		</Flex>
	);
};

export default Login;

Login.getLayout = function getLayout(page) {
	return (
		<Container h="100vh" size="lg">
			{page}
		</Container>
	);
};
