import styles from './NicknameWindow.module.css';
import { UserProfileProps } from './NicknameWindow.props';

export const NicknameWindow = ({ name }: UserProfileProps): JSX.Element => {

    return (
        <div className={styles.userProfile}>
            <div className={styles.avatar}></div>
            <div className={styles.userInfo}>{name}</div>
            <div className={styles.login}>Логин:</div>
            <button className={styles.label}>Выйти/Сменить пароль</button>
        </div>
    )
}