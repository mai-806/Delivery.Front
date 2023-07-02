import { AuthButtonProps } from './AuthButton.props';
import styles from './AuthButton.module.css';
import { LoadingDots } from 'components/LoadingDots/LoadingDots';

export const AuthButton = ({ loading, text, onClick }: AuthButtonProps): JSX.Element => {
	if (!loading) {
        return (
            <button className={styles.button} onClick={onClick}>{text}</button>
        );
    } else {
        return (
            <button className={styles.button_loading}>
                <LoadingDots />
            </button>
        );
    }
};