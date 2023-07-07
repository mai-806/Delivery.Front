import axios, { AxiosResponse } from "axios";
import { ToastError } from "components/Toast/Toast";
import { UserInterface } from "interfaces/user.interface";
import { setLocale } from "./locale.helper";

export async function changePassword(userId: string, newPassword: string) {
    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/auth/user/reset/?id=' + userId
        + '/?password=' + newPassword).then(function () {            
        console.log("OK");
    })
    .catch(function (error) {
        console.log("Ошибка HTTP при смене пароля: " + error);
    });  
}

export async function changePasswordLogin(router: any, newUsername: string, newPassword: string) {
    let { data: user }: AxiosResponse<UserInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
        '/v1/user/?login=' + newUsername);

    if (user.id !== undefined) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/auth/user/reset/?id=' + user.id
            + '/?password=' + newPassword).then(function () {            
            console.log("OK");
        })
        .catch(function (error) {
            console.log("Ошибка HTTP при смене пароля: " + error);
        });  
    } else {
        ToastError(setLocale(router.locale).no_user_found + '!');
    }
}