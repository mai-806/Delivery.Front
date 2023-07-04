import { ToastError } from "components/Toast/Toast";
import { CheckAuthInterface } from "interfaces/check_auth.interface";
import { setLocale } from "./locale.helper";

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export function checkAuth(authData: string[], si: boolean, locale: string | undefined): CheckAuthInterface {
    const checkAuth = {
        ok: false,
        errPassword: false,
        errConfirmPassword: false,
        errUsername: false,
        errEmail: false,
    };

    if (authData[0].length < 8
        || authData[0] !== authData[1] || authData[2].length === 0
        || !EMAIL_REGEXP.test(authData[4])) {
        if (authData[2].length === 0) {
            checkAuth.errUsername = true;
            if (!si) {
                { ToastError(setLocale(locale).error_name); }
            }
        }
        if (authData[0].length < 8) {
            checkAuth.errPassword = true;
            { ToastError(setLocale(locale).error_password); }
        }
        if (authData[0] !== authData[1]) {
            checkAuth.errConfirmPassword = true;
            if (!si) {
                { ToastError(setLocale(locale).error_confirm); }
            }
        }
        if (!EMAIL_REGEXP.test(authData[4])) {
            checkAuth.errEmail = true;
            { ToastError(setLocale(locale).error_email); }
        }
        if (si && authData[0].length >= 8 && EMAIL_REGEXP.test(authData[4])) {
            checkAuth.ok = true;
        }
    } else {
        checkAuth.ok = true;
    }

    return checkAuth;
}