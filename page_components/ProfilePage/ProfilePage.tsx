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


export const ProfilePage = ({ theme }: ProfilePageProps): JSX.Element => {
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
    let orderNumber: string = '12345';
    let date: string = '04/07/2023';
    let customer: string = 'Ivan Ivanov';
    let whereFrom: string = 'Smolensk';
    let whereTo: string = 'Moscow';
    let details: string = 'None';

    let order1: OrderInterface = {
        id: 1,
        orderNumber: '54321',
        date: '01/04/2023',
        customer: 'Pavel Filippov',
        address: 'Omsk',
        details: 'None',
    };

    let order2: OrderInterface = {
        id: 2,
        orderNumber: '74865',
        date: '13/06/2023',
        customer: 'DmitriMAI',
        address: 'Orenburg',
        details: 'None',
    };

    let orders: OrderInterface[] = [order1, order2];

    return (
        <AppContextProvider theme={theme}>
            <Header theme={themeState} newTheme={newTheme} setThemeState={setThemeState} />
            <div className={styles.profileWrapper}>
                <div className={styles.userInfoBlock}>
                    <NicknameWindow theme={themeState} name={name} email={email} />
                    <CurrentOrderWindow theme={themeState} orderNumber={orderNumber}
                        date={date} customer={customer} whereFrom={whereFrom}
                        whereTo={whereTo} details={details} />
                </div>
                <OrderHistory theme={themeState}>
                    {orders.map(o => (
                        <OrderHistoryItem key={o.id} theme={themeState} orderNumber={o.orderNumber}
                            date={o.date} customer={o.customer} address={o.address} details={o.details} />
                    ))}
                </OrderHistory>
            </div>
            <Footer theme={themeState} />
        </AppContextProvider>
    );
};