export interface OrderItemProps {
	theme: string,
	userType: 'customer' | 'executor' | 'admin',
	orderNumber: number,
	date: string,
	customer: string,
	whereFrom: string,
	whereTo: string,
	details: string,
}