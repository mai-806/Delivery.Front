import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type: 'email' | 'password' | 'text',
	text: string,
	value: string,
	error: boolean,
	eye: boolean,
	onChange: (e: any) => void,
}