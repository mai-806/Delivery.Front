import { OrderFormProps } from './OrderForm.props';
import styles from './OrderForm.module.css'
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import { useEffect } from 'react';
import cn from 'classnames';
import { map } from 'helpers/map.helper';


export const OrderForm = ({ theme, isMap, whereFrom, setWhereFrom,
    whereTo, setWhereTo, details, setDetails, isErrorWF, isErrorWT}: OrderFormProps ): JSX.Element => {
    const router = useRouter();

    useEffect(() => {
        map(theme, router, setWhereFrom, setWhereTo);
    }, [router]);

    return (
        <div id='map' className={styles.map} />
    );

    // if (isMap) {
    //     return (
    //         <div id='map' className={styles.map} />
    //     );
    // } else {
    //     return (
    //         <div className={styles.inputsWrapper}>
    //             <input className={cn(styles.input, {
    //                     [styles.darkThemeInput]: theme === 'dark',
	// 					[styles.error_input]: isErrorWF,
	// 				})}
    //                     placeholder={setLocale(router.locale).where_from}
	// 					value={whereFrom}
	// 					onChange={(e) => setWhereFrom(e.target.value)}
    //                     type="text"
    //                     name="where from"
	// 					aria-label="where from" />
    //             <input className={cn(styles.input, {
    //                     [styles.darkThemeInput]: theme === 'dark',
	// 					[styles.error_input]: isErrorWT,
	// 				})}
    //                     placeholder={setLocale(router.locale).where_to}
	// 					value={whereTo}
	// 					onChange={(e) => setWhereTo(e.target.value)}
    //                     type="text"
    //                     name="where to"
	// 					aria-label="where to" />
    //             <input className={cn(styles.input, {
    //                     [styles.darkThemeInput]: theme === 'dark',
	// 				})}
    //                     placeholder={setLocale(router.locale).details}
	// 					value={details}
	// 					onChange={(e) => setDetails(e.target.value)}
    //                     type="text"
    //                     name="details"
	// 					aria-label="details" />
    //         </div>
    //     );
    // }
}