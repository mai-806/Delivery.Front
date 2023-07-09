import { OrderItemProps } from './OrderItem.props';
import styles from './OrderItem.module.css'
import { Htag } from 'components/Htag/Htag';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { orderAssign } from 'helpers/order.helper';
import cn from 'classnames';
import { getPath } from 'helpers/map.helper';
import { addressHelper } from 'helpers/address.helper';


export const OrderItem = ({ theme, userType, orderNumber, customer,
	whereFromLon, whereFromLat, whereToLon, whereToLat, details, userId, setIsCourierMap }: OrderItemProps): JSX.Element => {
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
				})}>{setLocale(router.locale).where_from + ': ' + addressHelper(whereFromLon, whereFromLat)}</Htag>
				<Htag tag='s' className={cn(styles.text, {
					[styles.darkThemeText]: theme === 'dark',
				})}>{setLocale(router.locale).where_to + ': ' + addressHelper(whereToLon, whereToLat)}</Htag>
				<Htag tag='s' className={cn(styles.text, {
					[styles.darkThemeText]: theme === 'dark',
				})}>{setLocale(router.locale).details + ': ' + details}</Htag>
			</div>
			<Htag tag='l' className={cn(styles.action, {
				[styles.actionActive]: isActive,
			})} onClick={() => {
				getPath(userId, whereFromLon, whereFromLat, whereToLon, whereToLat);
				orderAssign(router, isActive, setIsActive, orderNumber, userId, setIsCourierMap);
			}}>
				{isActive ? setLocale(router.locale).finish : setLocale(router.locale).accept}
			</Htag>
		</div>
	)
}