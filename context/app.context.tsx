import { createContext, PropsWithChildren, useState } from 'react';

export interface IAppContext {
	theme: string;
	setTheme?: (newTheme: string) => void;
}

export const AppContext = createContext<IAppContext>({ theme: '' });

export const AppContextProvider = ({ theme, children }: PropsWithChildren<IAppContext>): JSX.Element => {
	const [themeState, setThemeState] = useState<string>(theme);
	const setTheme = (newTheme: string) => {
		setThemeState(newTheme);
	};

	return <AppContext.Provider value={{ theme: themeState, setTheme }}>
		{children}
	</AppContext.Provider>;
};