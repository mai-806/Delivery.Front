import { HomePageProps } from './HomePage.props';
import styles from './HomePage.module.css';
import { useRouter } from 'next/router';
import { AppContextProvider } from 'context/app.context';
import { setLocale } from 'helpers/locale.helper';
import cn from 'classnames';
import { Footer } from 'components/Footer/Footer';
import { useState } from 'react';
import { Header } from 'components/Header/Header';


export const HomePage = ({ theme, userType }: HomePageProps): JSX.Element => {
    const router = useRouter();

    const [themeState, setThemeState] = useState<string>(theme);

    let newTheme: string;

    if (themeState === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    if (userType === 'customer') {
        return (
            <AppContextProvider theme={theme}>
                <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
                <div className={styles.homeWrapper}>
                    Customer
                </div>
                <Footer theme={themeState} />
            </AppContextProvider>
        );
    } else if (userType === 'executor') {
        return (
            <AppContextProvider theme={theme}>
                <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
                <div className={styles.homeWrapper}>
                    Executor
                </div>
                <Footer theme={themeState} />
            </AppContextProvider>
        );
    } else {
        return (
            <AppContextProvider theme={theme}>
                <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
                <div className={styles.homeWrapper}>
                    Admin
                </div>
                <Footer theme={themeState} />
            </AppContextProvider>
        );
    }
}