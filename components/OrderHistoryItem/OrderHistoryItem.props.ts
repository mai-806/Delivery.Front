export interface OrderHistoryItemProps {
    theme: string,
    orderNumber: number,
    customer: string,
    address: string,
    details: string,
    userType: 'customer' | 'executor' | 'admin',
}