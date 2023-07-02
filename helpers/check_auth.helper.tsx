import { ToastError } from "components/Toast/Toast";
import { CheckAuthInterface } from "interfaces/check_auth.interface";
import { setLocale } from "./locale.helper";

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const routes = ['404', '500', 'home'];

export function checkAuth(authData: string[], si: boolean, locale: string | undefined): CheckAuthInterface {
    const checkAuth = {
        ok: false,
        errEmail: false,
        errPassword: false,
        errConfirmPassword: false,
        errFirstName: false,
        errLastName: false,
        errUsername: false,
    };

    if (!EMAIL_REGEXP.test(authData[0]) || authData[1].length < 8
        || authData[1] !== authData[2] || authData[3].length === 0
        || authData[4].length === 0 || authData[5].length === 0
        || routes.includes(authData[5])) {
        if (authData[3].length === 0) {
            checkAuth.errFirstName = true;
        }
        if (authData[4].length === 0) {
            checkAuth.errLastName = true;
        }
        if (authData[5].length === 0 || routes.includes(authData[5])) {
            checkAuth.errUsername = true;
        }
        if ((authData[3].length === 0 || authData[4].length === 0 || authData[5].length === 0) && !si) {
            { ToastError(setLocale(locale).error_name); }
        }
        if (routes.includes(authData[5]) && authData[5].length !== 0 && !si) {
            { ToastError(setLocale(locale).error_username); }
        }
        if (!EMAIL_REGEXP.test(authData[0])) {
            checkAuth.errEmail = true;
            { ToastError(setLocale(locale).error_email); }
        }
        if (authData[1].length < 8) {
            checkAuth.errPassword = true;
            { ToastError(setLocale(locale).error_password); }
        }
        if (authData[1] !== authData[2]) {
            checkAuth.errConfirmPassword = true;
            if (!si) {
                { ToastError(setLocale(locale).error_confirm); }
            }
        }
        if (si && EMAIL_REGEXP.test(authData[0]) && authData[1].length >= 8) {
            checkAuth.ok = true;
        }
    } else {
        checkAuth.ok = true;
    }

    return checkAuth;
}