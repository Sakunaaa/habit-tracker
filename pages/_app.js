import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function App(props) {
	const { Component, pageProps } = props;
	const getLayout = Component.getLayout || ((page) => page);

	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: 'dark',
					primaryColor: 'teal',
				}}
			>
				<SessionContextProvider
					supabaseClient={supabaseClient}
					initialSession={pageProps.initialSession}
				>
					{getLayout(<Component {...pageProps} />)}
				</SessionContextProvider>
			</MantineProvider>
		</>
	);
}
