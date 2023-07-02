import { AuthFormChangeProps } from './AuthFormChange.props';
import styles from './AuthFormChange.module.css';
import { Htag } from 'components/Htag/Htag';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';

export const AuthFormChange = ({ type, onClick }: AuthFormChangeProps): JSX.Element => {	
	const router = useRouter();
	
	if (type === 'login') {
		return (
			<button className={styles.button} onClick={onClick}>{setLocale(router.locale).sign_up}</button>
		);
	} else {
		return (
			<button className={styles.button} onClick={onClick}>{setLocale(router.locale).sign_in}</button>
		);
	}
};