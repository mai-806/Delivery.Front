import { AuthFormChangeProps } from './AuthFormChange.props';
import styles from './AuthFormChange.module.css';
import { Htag } from 'components/Htag/Htag';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';

export const AuthFormChange = ({ type, onClick }: AuthFormChangeProps): JSX.Element => {	
	const router = useRouter();
	
	if (type === 'login') {
		return (
			<div className={styles.formChange}>
				<Htag tag='s' className={styles.formChangeText}>{setLocale(router.locale).dont_have_account + ' '}
					<span className={styles.signSpan} onClick={onClick}>{setLocale(router.locale).sign_up}</span>
				</Htag>
			</div>
		);
	} else {
		return (
			<div className={styles.formChange}>
				<Htag tag='s' className={styles.formChangeText}>{setLocale(router.locale).have_account + ' '}
					<span className={styles.signSpan} onClick={onClick}>{setLocale(router.locale).sign_in}</span>
				</Htag>
			</div>
		);
	}
};