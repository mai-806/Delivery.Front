import { OrderItemProps } from './OrderItem.props';
import styles from './OrderItem.module.css'
import { Htag } from 'components/Htag/Htag';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import { useState } from 'react';
import cn from 'classnames';
import { orderAssign } from 'helpers/order.helper';


export const OrderItem = ({ theme, userType, orderNumber, customer,
	whereFrom, whereTo, details, userId }: OrderItemProps): JSX.Element => {
	const router = useRouter();
	
	const [isActive, setIsActive] = useState<boolean>(false);

	return (
		<div className={cn(styles.itemPage, {
			[styles.darkThemeItemPage]: theme === 'dark',
		})}>
			<div>
				<Htag tag='s' className={cn(styles.text, {
					[styles.darkThemeText]: theme === 'dark',
				})}>{setLocale(router.locale).order + ' №' + orderNumber}</Htag>
				<Htag tag='s' className={cn(styles.text, {
					[styles.darkThemeText]: theme === 'dark',
				})}>{(userType === 'customer' ? setLocale(router.locale).executor : setLocale(router.locale).customer) + ': ' + customer}</Htag>
				<Htag tag='s' className={cn(styles.text, {
					[styles.darkThemeText]: theme === 'dark',
				})}>{setLocale(router.locale).where_from + ': ' + whereFrom}</Htag>
				<Htag tag='s' className={cn(styles.text, {
					[styles.darkThemeText]: theme === 'dark',
				})}>{setLocale(router.locale).where_to + ': ' + whereTo}</Htag>
				<Htag tag='s' className={cn(styles.text, {
					[styles.darkThemeText]: theme === 'dark',
				})}>{setLocale(router.locale).details + ': ' + details}</Htag>
			</div>
			<Htag tag='l' className={cn(styles.action, {
				[styles.actionActive]: isActive,
			})} onClick={() => orderAssign(router, isActive, setIsActive, orderNumber, userId)}>
				{isActive ? setLocale(router.locale).finish : setLocale(router.locale).accept}
			</Htag>
		</div>
	)
}