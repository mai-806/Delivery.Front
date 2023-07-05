export interface CurrentOrderProps {
    theme: string,
    orderNumber: number,
    date: string,
    customer: string,
    whereFrom: string,
    whereTo: string,
    details: string,
    userType: 'customer' | 'executor' | 'admin',
}