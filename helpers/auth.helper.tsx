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
    let { data: user }: AxiosResponse<UserInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
        '/v1/user/?login=' + authData[2]);

    if (user.id !== undefined) {
        // Такого эндпоинта ещё нет, нужно будет фиксить
        let { data: isCompare }: AxiosResponse = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/user/compare/?id=' + user.id
        + '&password=' + authData[0]);

        if (isCompare.Compare === 'True') {
            localStorage.setItem('logged_in', 'true');
            localStorage.setItem('user_type', authData[3]);
            router.push('/home');
        } else {
            ToastError(setLocale(router.locale).incorrect_passwor + '!');
        }

    } else {
        ToastError(setLocale(router.locale).no_user_found + '!');
    }
}

export async function registerUser(authData: Array<string>, router: any) {
    let { data: user }: AxiosResponse<UserInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
        '/v1/user/?login=' + authData[2]);

    if (user.id === undefined) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/auth/register/?password='
            + authData[0], {
            login: authData[2],
            user_type: authData[4],
        }).then(function () {            
            localStorage.setItem('logged_in', 'true');
            localStorage.setItem('user_type', authData[3]);
            router.push('/home');
        })
        .catch(function (error) {
            console.log("Ошибка HTTP при создании пользователя: " + error);
        });  
    } else {
        ToastError(setLocale(router.locale).already_exist + '!');
    }
}