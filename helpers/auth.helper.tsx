import { ToastError, ToastSuccess } from "components/Toast/Toast";
import { CheckAuthInterface } from "interfaces/check_auth.interface";
import { checkAuth } from "./check_auth.helper";
import { setLocale } from "./locale.helper";
import axios, { AxiosResponse } from "axios";
import { UserInterface } from "interfaces/user.interface";

export async function checkUser(authData: Array<string>, errType: CheckAuthInterface, router: any,
    setError: (e: any) => void, setLoading: (e: any) => void, isLogin: boolean) {
    const checkResult = checkAuth(authData, isLogin, router.locale);

    if (!checkResult.ok) {
        setError(checkResult);
    } else {
        setError(errType);
        setLoading(true);
        if (isLogin) {
            loginUser(authData, router, setLoading);
        } else {
            registerUser(authData, router, setLoading);
        }
    }
}

export async function loginUser(authData: Array<string>, router: any, setLoading: (e: any) => void) {
    let { data: user }: AxiosResponse<UserInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
        '/v1/user/?login=' + authData[2]);

    if (user.id !== undefined) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/auth/register/?password='
            + authData[0], {
            login: authData[2],
        }).then(function () {
            ToastSuccess(setLocale(router.locale).cool + '!');
            localStorage.setItem('logged_in', 'true');
            localStorage.setItem('user_type', user.userType);
            localStorage.setItem('user_id', String(user.id));
            router.push('/home');
        })
        .catch(function (error) {
            ToastError(setLocale(router.locale).incorrect_passwor + '!');
            console.log("Ошибка HTTP при авторизации пользователя: " + error);
        });
    } else {
        ToastError(setLocale(router.locale).no_user_found + '!');
    }
    setLoading(false);
}

export async function registerUser(authData: Array<string>, router: any, setLoading: (e: any) => void) {
    let { data: user }: AxiosResponse<UserInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
        '/v1/user/?login=' + authData[2]);

    if (user.id === undefined) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/auth/register/?password='
            + authData[0], {
            login: authData[2],
            user_type: authData[4],
        }).then(function () {
            ToastSuccess(setLocale(router.locale).cool + '!');       
            localStorage.setItem('logged_in', 'true');
            localStorage.setItem('user_type', authData[3]);
            localStorage.setItem('user_id', String(user.id));
            router.push('/home');
        })
        .catch(function (error) {
            console.log("Ошибка HTTP при создании пользователя: " + error);
        });  
    } else {
        ToastError(setLocale(router.locale).already_exist + '!');
    }
    setLoading(false);
}