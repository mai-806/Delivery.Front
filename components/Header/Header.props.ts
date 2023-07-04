import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	theme: string,
	newTheme: string,
	setThemeState: (e: any) => void,
}