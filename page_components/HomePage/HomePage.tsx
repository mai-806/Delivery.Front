import { HomePageProps } from './HomePage.props';
import styles from './HomePage.module.css';
import { useRouter } from 'next/router';
import { AppContextProvider } from 'context/app.context';
import { useContext, useState } from 'react';
import { AppContext } from 'context/app.context';
import { setLocale } from 'helpers/locale.helper';
import cn from 'classnames';
import { Footer } from 'components/Footer/Footer';


export const HomePage = ({ theme, userType }: HomePageProps): JSX.Element => {
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

    if (userType === 'customer') {
        return (
            <AppContextProvider theme={theme}>
                Customer
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
                <Footer />
            </AppContextProvider>
        );
    } else if (userType === 'executor') {
        return (
            <AppContextProvider theme={theme}>
                Executor
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
                <Footer />
            </AppContextProvider>
        );
    } else {
        return (
            <AppContextProvider theme={theme}>
                Admin
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
                <Footer />
            </AppContextProvider>
        );
    }
}