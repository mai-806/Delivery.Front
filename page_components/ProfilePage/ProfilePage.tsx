import { ProfilePageProps } from './ProfilePage.props';
import styles from './ProfilePage.module.css';
import { AppContextProvider } from 'context/app.context';
import { useRouter } from 'next/router';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { useState } from 'react';
import { NicknameWindow } from 'components/NicknameWindow/NicknameWindow';
import { CurrentOrderWindow } from 'components/CurrentOrderWindow/CurrentOrderWindow';
import { OrderHistory } from 'components/OrderHistory/OrderHistory';
import { OrderInterface } from 'interfaces/order.interface';
import { OrderHistoryItem } from 'components/OrderHistoryItem/OrderHistoryItem';


export const ProfilePage = ({ theme, userType }: ProfilePageProps): JSX.Element => {
    const router = useRouter();

    const [themeState, setThemeState] = useState<string>(theme);

    let newTheme: string;

    if (themeState === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }

    let name: string = 'separatrix';
    let email: string = 'separatrix@gmail.com';

    let order1: OrderInterface = {
        id: 1,
        orderNumber: '54321',
        date: '01/04/2023',
        customer: 'Pavel Filippov',
        executor: 'Noname',
        whereFrom: 'Smolensk',
        whereTo: 'Omsk',
        details: 'None',
    };

    let order2: OrderInterface = {
        id: 2,
        orderNumber: '74865',
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
                <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
                <div className={styles.profileWrapper}>
                    <div className={styles.userInfoBlock}>
                        <NicknameWindow theme={themeState} name={name} email={email} />
                        <CurrentOrderWindow theme={themeState} userType={userType} orderNumber={order1.orderNumber}
                            date={order1.date} customer={order1.executor} whereFrom={order1.whereFrom}
                            whereTo={order1.whereTo} details={order1.details} />
                    </div>
                    <OrderHistory theme={themeState}>
                        {orders.map(o => (
                            <OrderHistoryItem key={o.id} theme={themeState} userType={userType} orderNumber={o.orderNumber}
                                date={o.date} customer={o.executor} address={o.whereTo} details={o.details} />
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
                        <NicknameWindow theme={themeState} name={name} email={email} />
                        <CurrentOrderWindow theme={themeState} userType={userType} orderNumber={order1.orderNumber}
                            date={order1.date} customer={order1.customer} whereFrom={order1.whereFrom}
                            whereTo={order1.whereTo} details={order1.details} />
                    </div>
                    <OrderHistory theme={themeState}>
                        {orders.map(o => (
                            <OrderHistoryItem key={o.id} theme={themeState} userType={userType} orderNumber={o.orderNumber}
                                date={o.date} customer={o.customer} address={o.whereTo} details={o.details} />
                        ))}
                    </OrderHistory>
                </div>
                <Footer theme={themeState} />
            </AppContextProvider>
        );
    } else {
        return (
            <></>
        );
    }
};