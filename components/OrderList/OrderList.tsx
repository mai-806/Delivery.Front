import { OrderListProps } from './OrderList.props';
import styles from './OrderList.module.css'
import { Htag } from 'components/Htag/Htag';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import cn from 'classnames';


export const OrderList = ({ theme, children }: OrderListProps): JSX.Element => {
	const router = useRouter();

	return (
		<div className={cn(styles.historyPage, {
			[styles.darkThemeHistoryPage]: theme === 'dark',
		})}>
			<Htag tag='l' className={cn(styles.text, {
				[styles.darkThemeText]: theme === 'dark',
			})}>{setLocale(router.locale).history_orders + ':'}</Htag>
			{children}
		</div>
	);
}