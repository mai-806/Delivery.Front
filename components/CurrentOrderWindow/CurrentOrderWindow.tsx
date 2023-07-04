import styles from './OrderHistory.module.css';

export const OrderHistory = (): JSX.Element => {
    return (
        <div className={styles.userProfile2}>
            <div className={styles.emblemText}></div>
            <div className={styles.emblem}></div>
            <div className={styles.userInfo2}>Текущий заказ</div>
            <div className={`${styles.infoOrderStyle} ${styles.infoOrder1}`}>Заказ №ххххх, хх/хх/20хх</div>
            <div className={`${styles.infoOrderStyle} ${styles.infoOrder2}`}>Заказчик :<br />
                Откуда :<br />
                Куда :<br />
                Детали заказа :</div>
        </div>
    )
}