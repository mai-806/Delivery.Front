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
import { orderPost } from 'helpers/order.helper';
import { OrderInterface, OrderPos } from 'interfaces/order.interface';
import { OrderList } from 'components/OrderList/OrderList';
import { OrderItem } from 'components/OrderItem/OrderItem';
import cn from 'classnames';


export const HomePage = ({ theme, userType, userId }: HomePageProps): JSX.Element => {
    const router = useRouter();

    const [themeState, setThemeState] = useState<string>(theme);

    let newTheme: string;

    if (themeState === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    const [isMap, setIsMap] = useState<boolean>(true);

    const [whereFrom, setWhereFrom] = useState<OrderPos>();
	const [whereTo, setWhereTo] = useState<OrderPos>();
    const [details, setDetails] = useState<string>('');
    const [isErrorWF, setIsErrorWF] = useState<boolean>(false);
    const [isErrorWT, setIsErrorWT] = useState<boolean>(false);

    let order1: OrderInterface = {
        id: 1,
        date: '01/04/2023',
        customer: 'Pavel Filippov',
        executor: 'Noname',
        whereFrom: 'Smolensk',
        whereTo: 'Omsk',
        details: 'None',
    };

    let order2: OrderInterface = {
        id: 2,
        date: '13/06/2023',
        customer: 'DmitriMAI',
        executor: 'Noname',
        whereFrom: 'Smolensk',
        whereTo: 'Orenburg',
        details: 'None',
    };

    let orders: OrderInterface[] = [order1, order2];

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
                        if (whereFrom === undefined || whereTo === undefined) {
                            if (whereFrom === undefined) {
                                setIsErrorWF(true);
                            } else {
                                setIsErrorWF(false);
                            }
                            if (whereTo === undefined) {
                                setIsErrorWT(true);
                            } else {
                                setIsErrorWT(false);
                            }
                        } else {
                            ToastSuccess(setLocale(router.locale).ordered + '!');
                            setIsErrorWF(false);
                            setIsErrorWT(false);
                            orderPost(userId, whereFrom, whereTo);
                        }
                        
                        // if (isMap) {
                        //     ToastSuccess(setLocale(router.locale).ordered + '!');
                        // } else {
                        //     if (+whereFrom === 0 || +whereTo === 0) {
                        //         if (+whereFrom === 0) {
                        //             setIsErrorWF(true);
                        //         } else {
                        //             setIsErrorWF(false);
                        //         }
                        //         if (+whereTo === 0) {
                        //             setIsErrorWT(true);
                        //         } else {
                        //             setIsErrorWT(false);
                        //         }
                        //     } else {
                        //         ToastSuccess(setLocale(router.locale).ordered + '!');
                        //         setIsErrorWF(false);
                        //         setIsErrorWT(false);

                        //         orderPost(userId, start, finish);
                        //     }
                        // }
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
                    <OrderList theme={themeState}>
                        {orders.map(o => (
                            <OrderItem key={o.id} theme={themeState} userType={userType} orderNumber={o.id}
                                date={o.date} customer={o.executor} whereFrom={o.whereFrom} whereTo={o.whereTo}
                                details={o.details} />
                        ))}
                    </OrderList>
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