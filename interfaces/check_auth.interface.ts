export interface CheckAuthInterface {
    ok: boolean,
    errEmail: boolean,
    errPassword: boolean,
    errConfirmPassword: boolean,
    errFirstName: boolean,
    errLastName: boolean,
    errUsername: boolean,
}