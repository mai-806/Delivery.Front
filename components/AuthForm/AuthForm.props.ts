import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AuthFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	type: 'login' | 'registration',
	setAuthState: (e: any) => void,
}