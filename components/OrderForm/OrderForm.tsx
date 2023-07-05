import { OrderFormProps } from './OrderForm.props';
import styles from './OrderForm.module.css'
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import { useState } from 'react';
import cn from 'classnames';


export const OrderForm = ({ theme, isMap, whereFrom, setWhereFrom,
    whereTo, setWhereTo, details, setDetails, isErrorWF, isErrorWT}: OrderFormProps ): JSX.Element => {
    const router = useRouter();

    if (isMap) {
        return (
            <div className={styles.map} />
        );
    } else {
        return (
            <div className={styles.inputsWrapper}>
                <input className={cn(styles.input, {
                        [styles.darkThemeInput]: theme === 'dark',
						[styles.error_input]: isErrorWF,
					})}
                        placeholder={setLocale(router.locale).where_from}
						value={whereFrom}
						onChange={(e) => setWhereFrom(e.target.value)}
                        type="text"
                        name="where from"
						aria-label="where from" />
                <input className={cn(styles.input, {
                        [styles.darkThemeInput]: theme === 'dark',
						[styles.error_input]: isErrorWT,
					})}
                        placeholder={setLocale(router.locale).where_to}
						value={whereTo}
						onChange={(e) => setWhereTo(e.target.value)}
                        type="text"
                        name="where to"
						aria-label="where to" />
                <input className={cn(styles.input, {
                        [styles.darkThemeInput]: theme === 'dark',
					})}
                        placeholder={setLocale(router.locale).details}
						value={details}
						onChange={(e) => setDetails(e.target.value)}
                        type="text"
                        name="details"
						aria-label="details" />
            </div>
        );
    }
}