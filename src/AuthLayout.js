import { useEffect, useState } from 'react';
import { supabaseClient } from './supabaseClient';
import { useRouter } from 'next/router';
import { createContext } from 'react';

export const UserContext = createContext(null);

export function AuthLayout(props) {
	const [user, setUser] = useState(null);
	const router = useRouter();
	const getUser = async () => {
		const result = await supabaseClient.auth.getUser();
		setUser(result.data.user);
		const isLoggedIn = result.data.user !== null;
		if (!isLoggedIn) {
			router.push('/login');
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	return (
		<UserContext.Provider value={user}>{props.children}</UserContext.Provider>
	);
}

// chcielibysmy zeby authlayout poza pobieraniem usera rozprowadzal go rowniez po calej aplikacji
// react context
