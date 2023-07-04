export interface CheckAuthInterface {
    ok: boolean,
    errPassword: boolean,
    errConfirmPassword: boolean,
    errUsername: boolean,
    errEmail: boolean,
}