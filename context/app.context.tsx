import { OrderInterfaceV2 } from 'interfaces/order.interface';
import { createContext, PropsWithChildren, useState } from 'react';

export interface IAppContext {
	orders?: OrderInterfaceV2[];
	theme: string;
	setTheme?: (newTheme: string) => void;
}

export const AppContext = createContext<IAppContext>({ orders: [], theme: '' });

export const AppContextProvider = ({ orders, theme, children }: PropsWithChildren<IAppContext>): JSX.Element => {
	const [ordersState] = useState<OrderInterfaceV2[] | undefined>(orders);
	const [themeState, setThemeState] = useState<string>(theme);
	const setTheme = (newTheme: string) => {
		setThemeState(newTheme);
	};

	return <AppContext.Provider value={{ orders: ordersState, theme: themeState, setTheme }}>
		{children}
	</AppContext.Provider>;
};