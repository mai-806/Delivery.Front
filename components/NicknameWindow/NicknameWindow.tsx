import { UserProfileProps } from './NicknameWindow.props';
import { Htag } from 'components/Htag/Htag';
import styles from './NicknameWindow.module.css';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import cn from 'classnames';


export const NicknameWindow = ({ theme, name, email }: UserProfileProps): JSX.Element => {
    const router = useRouter();

    return (
        <div className={cn(styles.userProfile, {
            [styles.darkThemeUserProfile]: theme === 'dark',
        })}>
            <div className={styles.userInfoBlock1}>
                <div className={cn(styles.avatar, {
                    [styles.darkThemeAvatar]: theme === 'dark',
                })} />
                <Htag tag='l'className={cn(styles.username, {
                    [styles.darkThemeUsername]: theme === 'dark',
                })}>{name}</Htag>
            </div>
            <div className={styles.userInfoBlock2}>
                <Htag tag='m' className={cn(styles.text, {
                    [styles.darkThemeText]: theme === 'dark',
                })}>
                    {setLocale(router.locale).email + ': ' + email }
                </Htag>
                <Htag tag='s' className={cn(styles.text, {
                    [styles.darkThemeText]: theme === 'dark',
                })}>
                    <span className={styles.logOut} onClick={() => {
                        localStorage.clear();
                        router.push('/');
                    }}>
                        {setLocale(router.locale).log_out}
                    </span> / <span className={styles.changePassword}>
                        {setLocale(router.locale).change_password}
                    </span>
                </Htag>
            </div>
        </div>
    )
}