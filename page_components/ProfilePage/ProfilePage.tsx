import { ProfilePageProps } from './ProfilePage.props';
import styles from './ProfilePage.module.css';
import { AppContextProvider } from 'context/app.context';
import { useRouter } from 'next/router';
import cn from 'classnames';


export const ProfilePage = ({ theme }: ProfilePageProps): JSX.Element => {
    const router = useRouter();

    return (
        <AppContextProvider theme={theme}>
        <div className={cn(styles.profileWrapper, {
            [styles.darkThemeWrapper]: theme === 'dark',
        })}>
            <button onClick={() => {
                localStorage.clear();
                router.push('/');
            }}>Sign Out</button>
        </div>
    </AppContextProvider>
    );
};