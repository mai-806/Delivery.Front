export interface OrderHistoryItemProps {
    theme: string,
    orderNumber: number,
    date: string,
    customer: string,
    address: string,
    details: string,
    userType: 'customer' | 'executor' | 'admin',
}