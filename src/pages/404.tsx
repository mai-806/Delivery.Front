import Head from 'next/head';
import { ErrorPage } from 'page_components/ErrorPage/ErrorPage';
import { useEffect, useState } from 'react';

function PageNotFound(): JSX.Element {
	const [theme, setTheme] = useState<string>('light');

	useEffect(() => {
		const currentTheme = localStorage.getItem('theme');

		if (currentTheme) {
			setTheme(currentTheme);
		}
	}, []);

	return (
		<>
			<Head>
				<title>{'tBench - 404'}</title>
			</Head>
			<ErrorPage error={404} theme={theme} />
		</>
	);
}

export default PageNotFound;