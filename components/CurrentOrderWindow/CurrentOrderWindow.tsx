import { CurrentOrderProps } from './CurrentOrderWindow.props';
import styles from './CurrentOrderWindow.module.css';
import { Htag } from 'components/Htag/Htag';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import cn from 'classnames';


export const CurrentOrderWindow = ({ theme, userType, orderNumber, customer, whereFrom,
    whereTo, details }: CurrentOrderProps): JSX.Element => {
    const router = useRouter();

    return (
        <div className={cn(styles.userProfile, {
            [styles.darkThemeUserProfile]: theme === 'dark',
        })}>
            <div className={styles.avatar} />
            <div>
                <Htag tag='l'className={cn(styles.currentOrder, {
                    [styles.darkThemeCurrentOrder]: theme === 'dark',
                })}>{setLocale(router.locale).current_order + ':'}</Htag>
                <Htag tag='s'className={cn(styles.text, {
                    [styles.darkThemeText]: theme === 'dark',
                })}>{setLocale(router.locale).order + ' №' + orderNumber}</Htag>
                <Htag tag='s'className={cn(styles.text, {
                    [styles.darkThemeText]: theme === 'dark',
                })}>{(userType === 'customer' ? setLocale(router.locale).executor : setLocale(router.locale).customer) + ': ' + customer}</Htag>
                <Htag tag='s'className={cn(styles.text, {
                    [styles.darkThemeText]: theme === 'dark',
                })}>{setLocale(router.locale).where_from + ': ' + whereFrom}</Htag>
                <Htag tag='s'className={cn(styles.text, {
                    [styles.darkThemeText]: theme === 'dark',
                })}>{setLocale(router.locale).where_to + ': ' + whereTo}</Htag>
                <Htag tag='s'className={cn(styles.text, {
                    [styles.darkThemeText]: theme === 'dark',
                })}>{setLocale(router.locale).details + ': ' + details}</Htag>
            </div>
        </div>
    )
}