import styles from './AuthPage.module.css';
import { AuthForm } from 'components/AuthForm/AuthForm';
import { useState } from 'react';
import { AuthBlock } from 'components/AuthBlock/AuthBlock';
import { Toaster } from 'react-hot-toast';


export const AuthPage = (): JSX.Element => {
    const [authState, setAuthState] = useState<'login' | 'registration'>('login');

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={true}
                toastOptions={{
                    duration: 2000,
                }}
            />
            <div className={styles.wrapper}>
                <AuthBlock>
                    <AuthForm type={authState} setAuthState={setAuthState} />
                </AuthBlock>
            </div>
        </>
    );
};