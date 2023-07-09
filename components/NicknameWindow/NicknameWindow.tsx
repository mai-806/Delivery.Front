import { UserProfileProps } from './NicknameWindow.props';
import { Htag } from 'components/Htag/Htag';
import styles from './NicknameWindow.module.css';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ToastError, ToastSuccess } from 'components/Toast/Toast';
import { changePassword } from 'helpers/change_password.helper';
import cn from 'classnames';


export const NicknameWindow = ({ theme, userId, name }: UserProfileProps): JSX.Element => {
    const router = useRouter();

    const [currentOrderId, setCurrentOrderId] = useState<string>('');

    useEffect(() => {
        let currentId = localStorage.getItem('setCurrentOrderId');

        if (currentId) {
            setCurrentOrderId(currentId);
        }
    }, []);

    const [active, setActive] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const handleKeyDown = (e: any) => {
		if (e.key == 'Enter') {
			if (+newPassword === 0 || newPassword.length < 8) {
                setIsError(true);
                ToastError(setLocale(router.locale).error_password + '!');
            } else {
                changePassword(userId, newPassword);
                setActive(false);
                setNewPassword('');
                setIsError(false);
                ToastSuccess(setLocale(router.locale).password_changed + '!');
            }
		}
	};

    return (
        <>
            <div className={cn(styles.userProfile, {
                [styles.darkThemeUserProfile]: theme === 'dark',
            })}>
                <div className={styles.userInfoBlock1}>
                    <div className={cn(styles.avatar, {
                        [styles.darkThemeAvatar]: theme === 'dark',
                    })}>{name[0]?.toUpperCase()}</div>
                    <Htag tag='l'className={cn(styles.username, {
                        [styles.darkThemeUsername]: theme === 'dark',
                    })}>{name}</Htag>
                </div>
                <Htag tag='s' className={cn(styles.text, {
                        [styles.darkThemeText]: theme === 'dark',
                    })}>
                    <span className={styles.logOut} onClick={() => {
                        localStorage.clear();
                        
                        if (+currentOrderId !== 0) {
                            localStorage.setItem('currentOrderId', currentOrderId);
                        }

                        router.push('/');
                    }}>
                        {setLocale(router.locale).log_out}
                    </span> / <span className={styles.changePassword} onClick={() => setActive(true)}>
                        {setLocale(router.locale).change_password}
                    </span>
                </Htag>
            </div>
            <Modal active={active} setActive={setActive}>
                <input className={cn(styles.input, {
                    [styles.darkThemeInput]: theme === 'dark',
					[styles.error_input]: isError,
				})}
                    placeholder={setLocale(router.locale).password}
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
                    type="text"
                    name="new password"
					aria-label="new password"
                    onKeyDown={handleKeyDown} />
            </Modal>
        </>
    )
}