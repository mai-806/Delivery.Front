import { OrderHistoryItemProps } from './OrderHistoryItem.props';
import styles from './OrderHistoryItem.module.css'
import { Htag } from 'components/Htag/Htag';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import cn from 'classnames';

export const OrderHistoryItem = ({ theme, userType, orderNumber, customer,
    address, details }: OrderHistoryItemProps ): JSX.Element => {
    const router = useRouter();

    return (
        <div className={cn(styles.itemPage, {
            [styles.darkThemeItemPage]: theme === 'dark',
        })}>
            <Htag tag='s'className={cn(styles.text, {
                [styles.darkThemeText]: theme === 'dark',
            })}>{setLocale(router.locale).order + ' №' + orderNumber}</Htag>
            <Htag tag='s'className={cn(styles.text, {
                [styles.darkThemeText]: theme === 'dark',
            })}>{(userType === 'customer' ? setLocale(router.locale).executor : setLocale(router.locale).customer) + ': ' + customer}</Htag>
            <Htag tag='s'className={cn(styles.text, {
                [styles.darkThemeText]: theme === 'dark',
            })}>{setLocale(router.locale).address + ': ' + address}</Htag>
            <Htag tag='s'className={cn(styles.text, {
                [styles.darkThemeText]: theme === 'dark',
            })}>{setLocale(router.locale).details + ': ' + details}</Htag>
        </div>
    )
}