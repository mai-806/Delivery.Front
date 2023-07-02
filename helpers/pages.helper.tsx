export function indexPageHelper(router: any, setIsAuth: (e: any) => void) {
	const loggedIn = localStorage.getItem('logged_in');

	if (loggedIn) {
		setIsAuth(true);
		router.push('/home');
	} else {
		setIsAuth(false);
	}
}

export function pageHelper(router: any, setIsAuth: (e: any) => void, setTheme: (e: any) => void) {
	const loggedIn = localStorage.getItem('logged_in');
	const currentTheme = localStorage.getItem('theme');

	if (loggedIn) {
		setIsAuth(true);
	} else {
		setIsAuth(false);
		router.push('/');
	}

	if (currentTheme) {
		setTheme(currentTheme);
	}
}