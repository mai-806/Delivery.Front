import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	theme?: string,
}