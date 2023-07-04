import { ProfilePageProps } from './ProfilePage.props';
import styles from './ProfilePage.module.css';
import { AppContextProvider } from 'context/app.context';
import { useRouter } from 'next/router';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { useState } from 'react';


export const ProfilePage = ({ theme }: ProfilePageProps): JSX.Element => {
    const router = useRouter();

    const [themeState, setThemeState] = useState<string>(theme);

    let newTheme: string;

    if (themeState === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    return (
        <AppContextProvider theme={theme}>
            <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
            <div className={styles.profileWrapper}>
                <button onClick={() => {
                    localStorage.clear();
                    router.push('/');
                }}>Sign Out</button>
            </div>
            <Footer theme={themeState} />
        </AppContextProvider>
    );
};