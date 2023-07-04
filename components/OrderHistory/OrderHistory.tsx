import styles from './OrderHistory.module.css';

export const OrderHistory = (): JSX.Element => {
    return (
        <div className={styles.historyPage}>
            <div className={styles.historyLabel}>История заказов</div>
            <div className={`${styles.orderDetail} ${styles.orderDetailLocation1}`} >
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation1}`}>Заказ № ххххх, хх/хх/20хх</div>
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation2}`}>Детали заказа: </div>
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation3}`}>Заказчик : <br /> Адресс : <br /></div>
            </div>
            <div className={`${styles.orderDetail} ${styles.orderDetailLocation2}`} >
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation1}`}>Заказ № ххххх, хх/хх/20хх</div>
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation2}`}>Детали заказа: </div>
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation3}`}>Заказчик : <br /> Адресс : <br /></div>
            </div>
            <div className={`${styles.orderDetail} ${styles.orderDetailLocation3}`} >
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation1}`}>Заказ № ххххх, хх/хх/20хх</div>
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation2}`}>Детали заказа: </div>
                <div className={`${styles.orderDetailTextStyle} ${styles.orderDetailTextLocation3}`}>Заказчик : <br /> Адресс : <br /></div>
            </div>
            <button className={styles.label2}>Ещё</button>
        </div>
    )
}