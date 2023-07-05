export interface OrderHistoryItemProps {
    theme: string,
    orderNumber: string,
    date: string,
    customer: string,
    address: string,
    details: string,
    userType: 'customer' | 'executor' | 'admin',
}