import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Layout } from '@/src/Layout';

export default function App(props) {
	const { Component, pageProps } = props;

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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}
