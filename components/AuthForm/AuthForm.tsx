import { AuthFormProps } from './AuthForm.props';
import styles from './AuthForm.module.css';
import { Input } from 'components/Input/Input';
import { useState } from 'react';
import { AuthButton } from 'components/AuthButton/AuthButton';
import { CheckAuthInterface } from 'interfaces/check_auth.interface';
import { InputWithEye } from 'components/InputWithEye/InputWithEye';
import { useRouter } from 'next/router';
import { AuthFormChange } from 'components/AuthFormChange/AuthFormChange';
import { setLocale } from 'helpers/locale.helper';
import { checkUser } from 'helpers/auth.helper';
import { Htag } from 'components/Htag/Htag';
import { AuthDelimiter } from 'components/AuthDelimiter/AuthDelimiter';
import { UserTypeChange } from 'components/UserTypeChange/UserTypeChange';
import { ToastError, ToastSuccess } from 'components/Toast/Toast';
import { Modal } from 'components/Modal/Modal';
import { changePasswordLogin } from 'helpers/change_password.helper';
import cn from 'classnames';


export const AuthForm = ({ type, setAuthState, className, ...props }: AuthFormProps): JSX.Element => {
	const router = useRouter();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [userType, setUserType] = useState<'customer' | 'executor' | 'admin'>('customer');

	const [pswdType, setPswdType] = useState<'email' | 'password' | 'text'>('password');
	const [confPswdType, setConfPswdType] = useState<'email' | 'password' | 'text'>('password');

	const [loading, setLoading] = useState<boolean>(false);

	const errType = {
		ok: false,
		errPassword: false,
		errConfirmPassword: false,
		errUsername: false,
	};

	const [error, setError] = useState<CheckAuthInterface>(errType);

	const authData = [password, confirmPassword, username, userType];

	const changeInputType = () => {
		if (pswdType !== 'text') {
			setPswdType('text');
		} else {
			setPswdType('password');
		}
	};

	const [active, setActive] = useState<boolean>(false);
	const [newUsername, setNewUsername] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [isErrorU, setIsErrorU] = useState<boolean>(false);
	const [isErrorP, setIsErrorP] = useState<boolean>(false);

	const handleKeyDown = (e: any) => {
		if (e.key == 'Enter') {
			if (+newUsername === 0 || +newPassword === 0 || newPassword.length < 8) {
                if (+newUsername === 0) {
					setIsErrorU(true);
                	ToastError(setLocale(router.locale).error_name + '!');
				} else {
					setIsErrorU(false);
				}
				if (+newPassword === 0 || newPassword.length < 8) {
					setIsErrorP(true);
                	ToastError(setLocale(router.locale).error_password + '!');
				} else {
					setIsErrorP(false);
				}
            } else {
                changePasswordLogin(router, newUsername, newPassword);
                setActive(false);
                setNewPassword('');
				setNewUsername('');
                setIsErrorU(false);
				setIsErrorP(false);
                ToastSuccess(setLocale(router.locale).password_changed + '!');
            }
		}
	};

	if (type === 'login') {
		return (
			<>
				<div className={cn(className, styles.authForm)} {...props}>
					<div className={styles.logo} />
					<Htag tag='xl' className={styles.welcome}>{setLocale(router.locale).welcome}</Htag>
					<p className={styles.slogan}>В любую погоду, и в город, и в лес, посылку доставит МяуМяуЭкспресс :)</p>
					<Input type='text' text={setLocale(router.locale).username}
						value={username} error={error.errUsername} eye={false}
						onChange={(e) => setUsername(e.target.value)} />
					<InputWithEye onMouseEnter={() => setPswdType('text')}
						onMouseLeave={() => setPswdType('password')}
						onClick={() => {
							if (pswdType !== 'text') {
								setPswdType('text');
							} else {
								setPswdType('password');
							}
						}}>
						<Input type={pswdType} text={setLocale(router.locale).password}
							value={password} error={error.errPassword} eye={true}
							onChange={(e) => setPassword(e.target.value)} />
					</InputWithEye>
					<AuthButton loading={loading} text={setLocale(router.locale).sign_in}
						onClick={() => checkUser(authData, errType, router, setError, setLoading, true)} />
					<Htag tag='s' className={styles.forgot} onClick={() => setActive(true)}>
						{setLocale(router.locale).forgot_password}
					</Htag>
					<AuthDelimiter />
					<AuthFormChange type={'login'} onClick={() => setAuthState('registration')} />
				</div>
				<Modal active={active} setActive={setActive}>
					<div className={styles.changeWrapper}>
						<input className={cn(styles.input, {
							[styles.error_input]: isErrorU,
						})}
							placeholder={setLocale(router.locale).username}
							value={newUsername}
							onChange={(e) => setNewUsername(e.target.value)}
							type="text"
							name="new username"
							aria-label="new username"
							onKeyDown={handleKeyDown} />
						<input className={cn(styles.input, {
							[styles.error_input]: isErrorP,
						})}
							placeholder={setLocale(router.locale).password}
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							type="text"
							name="new password"
							aria-label="new password"
							onKeyDown={handleKeyDown} />
					</div>
				</Modal>
			</>
		);
	} else {
		return (
			<div className={cn(className, styles.authForm)} {...props}>
				<Htag tag='xl' className={styles.welcome}>{setLocale(router.locale).welcome}</Htag>
				<p className={styles.slogan}>В любую погоду, и в город, и в лес, посылку доставит МяуМяуЭкспресс :)</p>
				<Input type='text' text={setLocale(router.locale).username}
					value={username} error={error.errUsername} eye={false}
					onChange={(e) => setUsername(e.target.value)} />
				<InputWithEye onMouseEnter={() => setPswdType('text')}
					onMouseLeave={() => setPswdType('password')}
					onClick={() => changeInputType}>
					<Input type={pswdType} text={setLocale(router.locale).password}
						value={password} error={error.errPassword} eye={true}
						onChange={(e) => setPassword(e.target.value)} />
				</InputWithEye>
				<InputWithEye onMouseEnter={() => setConfPswdType('text')}
					onMouseLeave={() => setConfPswdType('password')}
					onClick={() => changeInputType}>
					<Input type={confPswdType} text={setLocale(router.locale).confirm_password}
						value={confirmPassword} error={error.errConfirmPassword} eye={true}
						onChange={(e) => setConfirmPassword(e.target.value)} />
				</InputWithEye>
				<UserTypeChange userType={userType} setUserType={setUserType} />
				<AuthButton loading={loading} text={setLocale(router.locale).sign_up}
					onClick={() => checkUser(authData, errType, router, setError, setLoading, false)} />
				<AuthDelimiter />
				<AuthFormChange type={'registration'} onClick={() => setAuthState('login')} />
			</div>
		);
	}
};
