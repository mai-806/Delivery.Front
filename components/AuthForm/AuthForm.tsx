import { AuthFormProps } from './AuthForm.props';
import styles from './AuthForm.module.css';
import cn from 'classnames';
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

export const AuthForm = ({ type, setAuthState, className, ...props }: AuthFormProps): JSX.Element => {
	const router = useRouter();

	const [email, setEmail] = useState<string>('');
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
		errEmail: false,
	};

	const [error, setError] = useState<CheckAuthInterface>(errType);

	const authData = [password, confirmPassword, username, userType, email];

	const changeInputType = () => {
		if (pswdType !== 'text') {
			setPswdType('text');
		} else {
			setPswdType('password');
		}
	};

	if (type === 'login') {
		return (
			<div className={cn(className, styles.authForm)} {...props}>
				<div className={styles.logo} />
				<Htag tag='xl' className={styles.welcome}>{setLocale(router.locale).welcome}</Htag>
				<p className={styles.slogan}>В любую погоду, и в город, и в лес, посылку доставит МяуМяуЭкспресс :)</p>
				<Input type='email' text={setLocale(router.locale).email}
					value={email} error={error.errEmail} eye={false}
					onChange={(e) => setEmail(e.target.value)} />
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
				<Htag tag='s' className={styles.forgot}>{setLocale(router.locale).forgot_password}</Htag>
				<AuthDelimiter />
				<AuthFormChange type={'login'} onClick={() => setAuthState('registration')} />
			</div>
		);
	} else {
		return (
			<div className={cn(className, styles.authForm)} {...props}>
				<Htag tag='xl' className={styles.welcome}>{setLocale(router.locale).welcome}</Htag>
				<p className={styles.slogan}>В любую погоду, и в город, и в лес, посылку доставит МяуМяуЭкспресс :)</p>
				<Input type='email' text={setLocale(router.locale).email}
					value={email} error={error.errEmail} eye={false}
					onChange={(e) => setEmail(e.target.value)} />
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
