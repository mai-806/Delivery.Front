import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface UserTypeChangeProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	userType: 'customer' | 'executor' | 'admin',
	setUserType: (e: any) => void,
}