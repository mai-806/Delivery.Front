import { AuthBlockProps } from './AuthBlock.props';
import styles from './AuthBlock.module.css';


export const AuthBlock = ({ children }: AuthBlockProps): JSX.Element => {
    return (
        <div className={styles.authBlock}>
            {children}
        </div>
    );
};