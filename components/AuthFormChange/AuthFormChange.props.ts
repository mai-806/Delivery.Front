import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AuthFormChangeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	type: 'login' | 'registration',
	onClick: (e: any) => void,
}