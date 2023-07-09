import { ProfilePageProps } from './ProfilePage.props';
import styles from './ProfilePage.module.css';
import { AppContextProvider } from 'context/app.context';
import { useRouter } from 'next/router';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { useEffect, useState } from 'react';
import { NicknameWindow } from 'components/NicknameWindow/NicknameWindow';
import { CurrentOrderWindow } from 'components/CurrentOrderWindow/CurrentOrderWindow';
import { OrderHistory } from 'components/OrderHistory/OrderHistory';
import { OrderInterface } from 'interfaces/order.interface';
import { OrderHistoryItem } from 'components/OrderHistoryItem/OrderHistoryItem';
import { Toaster } from 'react-hot-toast';
import { currentOrder } from 'helpers/current_order.helper';


export const ProfilePage = ({ theme, userType, userId, username }: ProfilePageProps): JSX.Element => {
    const router = useRouter();

    const [currentOrderNumber, setCurrentOrderNumber] = useState<string>('');
    const [currentCustomer, setCurrentCustomer] = useState<string>('');
    const [currentWF, setCurrentWF] = useState<string>('');
    const [currentWT, setCurrentWT] = useState<string>('');
    const [currentDetails, setCurrentDetails] = useState<string>('');

    useEffect(() => {
        currentOrder(setCurrentOrderNumber, setCurrentCustomer, setCurrentWF, setCurrentWT, setCurrentDetails);
    }, []);

    const [themeState, setThemeState] = useState<string>(theme);

    let newTheme: string;

    if (themeState === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    let order1: OrderInterface = {
        id: 1,
        customer: 'Pavel Filippov',
        executor: 'Noname',
        whereFrom: 'Smolensk',
        whereTo: 'Omsk',
        details: 'None',
    };

    let order2: OrderInterface = {
        id: 2,
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
                <div className={styles.profileWrapper}>
                    <div className={styles.userInfoBlock}>
                        <NicknameWindow theme={themeState} userId={userId} name={username} />
                        <CurrentOrderWindow theme={themeState} userType={userType} orderNumber={currentOrderNumber}
                            customer={currentCustomer} whereFrom={currentWF}
                            whereTo={currentWT} details={currentDetails} />
                    </div>
                    <OrderHistory theme={themeState}>
                        {orders.map(o => (
                            <OrderHistoryItem key={o.id} theme={themeState} userType={userType} orderNumber={o.id}
                                customer={o.executor} address={o.whereTo} details={o.details} />
                        ))}
                    </OrderHistory>
                </div>
                <Footer theme={themeState} />
            </AppContextProvider>
        );
    } else if (userType === 'executor') {
        return (
            <AppContextProvider theme={theme}>
                <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
                <div className={styles.profileWrapper}>
                    <div className={styles.userInfoBlock}>
                        <NicknameWindow theme={themeState} userId={userId} name={username} />
                        <CurrentOrderWindow theme={themeState} userType={userType} orderNumber={currentOrderNumber}
                            customer={currentCustomer} whereFrom={currentWF}
                            whereTo={currentWT} details={currentDetails} />
                    </div>
                    <OrderHistory theme={themeState}>
                        {orders.map(o => (
                            <OrderHistoryItem key={o.id} theme={themeState} userType={userType} orderNumber={o.id}
                                customer={o.customer} address={o.whereTo} details={o.details} />
                        ))}
                    </OrderHistory>
                </div>
                <Footer theme={themeState} />
            </AppContextProvider>
        );
    } else {
        return (
            <AppContextProvider theme={theme}>
                <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
                <div className={styles.profileWrapper}>
                    <div className={styles.userInfoBlock}>
                        <NicknameWindow theme={themeState} userId={userId} name={username} />
                    </div>
                </div>
                <Footer theme={themeState} />
            </AppContextProvider>
        );
    }
};