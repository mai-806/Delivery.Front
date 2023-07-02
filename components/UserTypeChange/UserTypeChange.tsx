import { UserTypeChangeProps } from './UserTypeChange.props';
import styles from './UserTypeChange.module.css';
import { Htag } from 'components/Htag/Htag';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import cn from 'classnames';


export const UserTypeChange = ({ userType, setUserType }: UserTypeChangeProps): JSX.Element => {
	const router = useRouter();

	return (
		<div className={styles.genderChangeBlock}>
			<Htag tag='s' className={cn({
				[styles.genderActive]: userType === 'customer',
			})} onClick={() => setUserType('customer')}>{setLocale(router.locale).customer}</Htag>
			<Htag tag='s' className={cn({
				[styles.genderActive]: userType === 'executor',
			})} onClick={() => setUserType('executor')}>{setLocale(router.locale).executor}</Htag>
			<Htag tag='s' className={cn({
				[styles.genderActive]: userType === 'admin',
			})} onClick={() => setUserType('admin')}>{setLocale(router.locale).admin}</Htag>
		</div>
	);
};