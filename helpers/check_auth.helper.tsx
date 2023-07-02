import { ToastError } from "components/Toast/Toast";
import { CheckAuthInterface } from "interfaces/check_auth.interface";
import { setLocale } from "./locale.helper";

export function checkAuth(authData: string[], si: boolean, locale: string | undefined): CheckAuthInterface {
    const checkAuth = {
        ok: false,
        errPassword: false,
        errConfirmPassword: false,
        errUsername: false,
    };

    if (authData[0].length < 8
        || authData[0] !== authData[1] || authData[2].length === 0) {
        if (authData[2].length === 0) {
            checkAuth.errUsername = true;
        }
        if (authData[2].length !== 0 && !si) {
            { ToastError(setLocale(locale).error_username); }
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
        if (si && authData[0].length >= 8) {
            checkAuth.ok = true;
        }
    } else {
        checkAuth.ok = true;
    }

    return checkAuth;
}