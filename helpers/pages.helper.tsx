export function pageHelper(router: any, setIsAuth: (e: any) => void) {
	const loggedIn = localStorage.getItem('logged_in');

	if (loggedIn) {
		setIsAuth(true);
		router.push('/');
	} else {
		setIsAuth(false);
	}
}