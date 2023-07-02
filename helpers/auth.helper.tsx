import { ToastSuccess } from "components/Toast/Toast";
import { CheckAuthInterface } from "interfaces/check_auth.interface";
import { checkAuth } from "./check_auth.helper";
import { setLocale } from "./locale.helper";

export async function checkUser(authData: Array<string>, errType: CheckAuthInterface, router: any,
    setError: (e: any) => void, setLoading: (e: any) => void, isLogin: boolean) {
    const checkResult = checkAuth(authData, isLogin, router.locale);

    if (!checkResult.ok) {
        setError(checkResult);
    } else {
        setError(errType);
        setLoading(true);
        ToastSuccess(setLocale(router.locale).cool + '!');
        setTimeout(() => {
            setLoading(false);

            if (isLogin) {
                loginUser(authData, router);
            } else {
                registerUser(authData, router);
            }
        }, 1000);
    }
}

export async function loginUser(authData: Array<string>, router: any) {
    localStorage.setItem('logged_in', 'true');
    router.push('/home');
}

export async function registerUser(authData: Array<string>, router: any) {
    alert('register');
}