export interface OrderItemProps {
	theme: string,
	userType: 'customer' | 'executor' | 'admin',
	orderNumber: number,
	customer: string,
	whereFromLon: number,
	whereFromLat: number,
	whereToLon: number,
	whereToLat: number,
	details: string,
	userId: string,
	setIsCourierMap: (e: any) => void,
}