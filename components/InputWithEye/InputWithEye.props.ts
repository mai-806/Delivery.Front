import { ReactNode } from 'react';

export interface InputWithEyeProps {
	children: ReactNode,
	onClick: (e: any) => void,
	onMouseEnter: (e: any) => void,
	onMouseLeave: (e: any) => void,
}