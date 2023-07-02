import styles from './AuthDelimiter.module.css';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';


export const AuthDelimiter = (): JSX.Element => {
    const router = useRouter();

	return (
        <div className={styles.wrapper}>
            <span className={styles.delimiter} />
            <span className={styles.text}>{setLocale(router.locale).or}</span>
            <span className={styles.delimiter} />
        </div>
    );
};
