import { HomePageProps } from './HomePage.props';
import styles from './HomePage.module.css';
import { useRouter } from 'next/router';
import { AppContextProvider } from 'context/app.context';
import { useContext, useState } from 'react';
import { AppContext } from 'context/app.context';
import { setLocale } from 'helpers/locale.helper';
import cn from 'classnames';


export const HomePage = ({ theme }: HomePageProps): JSX.Element => {
    const router = useRouter();
    const context = useContext(AppContext);

    const myName: string = "Ivan";

    const [themeState, setThemeState] = useState<string>(theme);
    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
    };

    let newTheme: string;

    if (themeState === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    return (
        <AppContextProvider theme={theme}>
            <div className={cn(styles.homeWrapper, {
                [styles.darkThemeWrapper]: themeState === 'dark',
            })}>
                <button onClick={() => {
                    router.push('/profile');
                }}>{setLocale(router.locale).profile}</button>
                <button onClick={() => {
                    context.setTheme?.(newTheme);
                    setTheme?.(newTheme);
                    localStorage.setItem('theme', newTheme);
                }}>Change Theme</button>
            </div>
        </AppContextProvider>
    );
}