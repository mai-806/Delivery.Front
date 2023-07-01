export function pageHelper(router: any, setIsAuth: (e: any) => void) {
	const loggedIn = localStorage.getItem('logged_in');

	if (loggedIn) {
		setIsAuth(true);
	} else {
		setIsAuth(false);
	}
}

export function redirectHelper(router: any, pageDirect: string, flag: boolean) {
	const loggedIn = localStorage.getItem('logged_in');
	
	if (flag) {
		if (loggedIn) {
			router.push('/' + pageDirect);
		}
	} else {
		if (!loggedIn) {
			router.push('/' + pageDirect);
		}
	}
}