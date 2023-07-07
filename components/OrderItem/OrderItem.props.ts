export interface OrderItemProps {
	theme: string,
	userType: 'customer' | 'executor' | 'admin',
	orderNumber: number,
	customer: string,
	whereFrom: string,
	whereTo: string,
	details: string,
	userId: string,
}