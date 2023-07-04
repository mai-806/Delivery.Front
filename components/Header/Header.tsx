import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import { Htag } from 'components/Htag/Htag';
import { setLocale } from 'helpers/locale.helper';
import { useRouter } from 'next/router';
import { BiHomeAlt2, BiMoon, BiSun, BiUser } from "react-icons/bi";
import Theme from './Theme.svg';
import { useContext, useState } from 'react';
import { AppContext } from 'context/app.context';
import cn from 'classnames';


export const Header = ({ theme, newTheme, setThemeState }: HeaderProps): JSX.Element => {
    const context = useContext(AppContext);
    const router = useRouter();

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
    };

    let IconTheme;

    if (newTheme === 'light') {
        IconTheme = BiMoon;
    } else {
        IconTheme = BiSun;
    }

    return (
        <header className={cn(styles.header, {
            [styles.darkThemeHeader]: theme === 'dark',
        })}>
            <Htag tag='xl' className={cn(styles.text, {
                [styles.darkThemeText]: theme === 'dark',
            })}>{process.env.NEXT_PUBLIC_TITLE}</Htag>
            <span className={cn(styles.svg, {
                [styles.darkThemeSvg]: theme === 'dark',
            })} onClick={() => {
                        context.setTheme?.(newTheme);
                        setTheme?.(newTheme);
                        localStorage.setItem('theme', newTheme);
                    }}>
                <IconTheme />
            </span>
            <span className={cn(styles.svg, {
                [styles.darkThemeSvg]: theme === 'dark',
            })} onClick={() => router.push('/home')}>
                <BiHomeAlt2 />
            </span>
            <span className={cn(styles.svg, {
                [styles.darkThemeSvg]: theme === 'dark',
            })} onClick={() => router.push('/profile')}>
                <BiUser />
            </span>
        </header>
    );
};