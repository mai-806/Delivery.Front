import { HomePageProps } from './HomePage.props';
import styles from './HomePage.module.css';
import { useRouter } from 'next/router';
import { AppContextProvider } from 'context/app.context';
import { useContext, useState } from 'react';
import { AppContext } from 'context/app.context';
import cn from 'classnames';


export const HomePage = ({ theme, isAuth }: HomePageProps): JSX.Element => {
    const router = useRouter();
    const context = useContext(AppContext);

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

    let text: string;

    if (isAuth) {
        text = "Sign Out";
    } else {
        text = "Auth";
    }

    return (
        <AppContextProvider theme={theme}>
            <div className={cn(styles.homeWrapper, {
                [styles.darkThemeWrapper]: themeState === 'dark',
            })}>
                <button onClick={() => {
                    if (isAuth) {
                        localStorage.clear();
                    } else {
                        router.push('/auth');
                    }
                }}>{text}</button>
                <button onClick={() => {
                    context.setTheme?.(newTheme);
                    setTheme?.(newTheme);
                    localStorage.setItem('theme', newTheme);
                }}>Change Theme</button>
            </div>
        </AppContextProvider>
    );
}