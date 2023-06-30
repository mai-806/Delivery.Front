import { MyTextProps } from './MyText.props';
import styles from './MyText.module.css';


export const MyText = ({ name }: MyTextProps): JSX.Element => {
  
    return (
        <>
            <h1 className={styles.text} onClick={() => {
                alert(name);
            }}>{name}</h1>
        </>
    );
};