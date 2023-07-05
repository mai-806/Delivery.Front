import { HomePageProps } from './HomePage.props';
import styles from './HomePage.module.css';
import { useRouter } from 'next/router';
import { AppContextProvider } from 'context/app.context';
import { setLocale } from 'helpers/locale.helper';
import { Footer } from 'components/Footer/Footer';
import { useState } from 'react';
import { Header } from 'components/Header/Header';
import { OrderForm } from 'components/OrderForm/OrderForm';
import { ToastSuccess } from "components/Toast/Toast";
import { Toaster } from 'react-hot-toast';
import cn from 'classnames';


export const HomePage = ({ theme, userType }: HomePageProps): JSX.Element => {
    const router = useRouter();

    const [themeState, setThemeState] = useState<string>(theme);

    let newTheme: string;

    if (themeState === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    const [isMap, setIsMap] = useState<boolean>(true);

    const [whereFrom, setWhereFrom] = useState<string>('');
	const [whereTo, setWhereTo] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [isErrorWF, setIsErrorWF] = useState<boolean>(false);
    const [isErrorWT, setIsErrorWT] = useState<boolean>(false);

    if (userType === 'customer') {
        return (
            <AppContextProvider theme={theme}>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        duration: 2000,
                    }}
                />
                <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
                <div className={styles.homeWrapper}>
                    <div className={styles.buttonsWrapper}>
                        <button className={cn(styles.button, {
                            [styles.darkThemeButton]: themeState === 'dark',
                        })} onClick={() => setIsMap(false)}>{setLocale(router.locale).enter_manually}</button>
                        <button className={cn(styles.button, {
                            [styles.darkThemeButton]: themeState === 'dark',
                        })} onClick={() => setIsMap(true)}>{setLocale(router.locale).select_on_map}</button>
                    </div>
                    <OrderForm theme={themeState} isMap={isMap} whereFrom={whereFrom} setWhereFrom={setWhereFrom}
                        whereTo={whereTo} setWhereTo={setWhereTo} details={details} setDetails={setDetails}
                        isErrorWF={isErrorWF} isErrorWT={isErrorWT} />
                    <button className={cn(styles.orderButton, {
                        [styles.darkThemeOrderButton]: themeState === 'dark',
                    })} onClick={() => {
                        if (isMap) {
                            ToastSuccess(setLocale(router.locale).ordered + '!');
                        } else {
                            if (+whereFrom === 0 || +whereTo === 0) {
                                if (+whereFrom === 0) {
                                    setIsErrorWF(true);
                                } else {
                                    setIsErrorWF(false);
                                }
                                if (+whereTo === 0) {
                                    setIsErrorWT(true);
                                } else {
                                    setIsErrorWT(false);
                                }
                            } else {
                                ToastSuccess(setLocale(router.locale).ordered + '!');
                                setIsErrorWF(false);
                                setIsErrorWT(false);
                            }
                        }
                    }}>
                        {setLocale(router.locale).order2}
                    </button>
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