import { useEffect } from 'react';
import { supabaseClient } from './supabaseClient';
import { useRouter } from 'next/router';

export function AuthLayout(props) {
	const router = useRouter();
	const getUser = async () => {
		const result = await supabaseClient.auth.getUser();
		const isLoggedIn = result.data.user !== null;
		if (!isLoggedIn) {
			router.push('/login');
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	return props.children;
}
