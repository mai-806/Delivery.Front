import { format } from 'date-fns';

export function setFooterYear(): string {
    if (format(new Date(), 'yyyy') === '2023') {
        return '2023';
    } else {
        return '2023 - ' + format(new Date(), 'yyyy');
    }
}