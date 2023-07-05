import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LocalChangeProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	theme: string | undefined,
}