import { LocalChangeProps } from './LocalChange.props'
import styles from './LocaleChange.module.css';
import { Htag } from 'components/Htag/Htag';
import { useRouter } from 'next/router';
import { en } from 'locales/en.locale';
import { ru } from 'locales/ru.locale';
import { fr } from 'locales/fr.locale';
import { de } from 'locales/de.locale';
import { zh } from 'locales/zh.locale';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { setLocale } from 'helpers/locale.helper';
import cn from 'classnames';


export const LocaleChange = ({ theme }: LocalChangeProps): JSX.Element => {
    const router = useRouter();

    const [active, setActive] = useState<boolean>(false);

    const languages = [en, ru, fr, de, zh];
    const langIndex = languages.indexOf(setLocale(router.locale));

    if (langIndex !== -1) {
        languages.splice(langIndex, 1);
    }

	return (
        <>
            <span onClick={() => setActive(true)}>
                <Htag tag='s' className={cn(styles.lang, {
                    [styles.darkThemeLang]: theme === 'dark',
                })} onClick={() => setActive(true)}>
                    {setLocale(router.locale).language}
                </Htag>
            </span>
            <Modal active={active} setActive={setActive}>
                <div className={styles.blockLanguages}>
                    {languages.map(m => (
                        <Link key={m.locale} href={router.asPath} locale={m.locale} 
                            onClick={() => setActive(false)}>
                            <Htag tag='l' className={cn(styles.langLink, {
                    [styles.darkThemeLangLink]: theme === 'dark',
                })}>{m.language}</Htag>
                        </Link>
                    ))}
                </div>
            </Modal>
        </>
    );
};