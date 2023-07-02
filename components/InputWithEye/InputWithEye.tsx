import { InputWithEyeProps } from './InputWithEye.props';
import styles from './InputWithEye.module.css';
import Eye from './eye.svg';

export const InputWithEye = ({ children, onClick, onMouseEnter, onMouseLeave }: InputWithEyeProps): JSX.Element => {
    return (
        <label className={styles.label}>
            <span className={styles.icon}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}>
                <Eye />
            </span>
            {children}
        </label>
    );
};