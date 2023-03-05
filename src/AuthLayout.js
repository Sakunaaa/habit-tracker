import { useEffect } from 'react';
import { supabaseClient } from './supabaseClient';

export function AuthLayout(props) {
	const getUser = async () => {
		const result = await supabaseClient.auth.getUser();
		console.log(result);
	};
	useEffect(() => {
		getUser();
	}, []);

	return props.children;
}
