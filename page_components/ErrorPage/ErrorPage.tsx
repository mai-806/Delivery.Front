import { ErrorPageProps } from "./ErrorPage.props";
import styles from './ErrorPage.module.css';
import Link from "next/link";
import { useRouter } from "next/router";
import { Htag } from "components/Htag/Htag";
import { setLocale } from "helpers/locale.helper";
import cn from "classnames";


export const ErrorPage = ({ error, theme }: ErrorPageProps): JSX.Element => {
    const router = useRouter();

    let errorText = "";

    if (error === 404) {
        errorText = setLocale(router.locale).error404;
    } else {
        errorText = setLocale(router.locale).error500;
    }

    return (
        <div className={cn(styles.errorPage, {
            [styles.darkTheme]: theme === 'dark',
        })}>
            <Link href='/'>
                <Htag tag="l" className={cn(styles.errorText, {
                    [styles.darkThemeErrorText]: theme === 'dark',
                })}>
                    {errorText}
                </Htag>
            </Link>
        </div>
    );
};