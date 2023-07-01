import styles from './ProfilePage.module.css';
import { useRouter } from 'next/router';


export const ProfilePage = (): JSX.Element => {
    const router = useRouter();

    return (
        <>
            Profile
            <button onClick={() => {
                localStorage.clear();
                router.push('/');
            }}>Sign Out</button>
        </>
    );
};