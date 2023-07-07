import { OrderInterfaceV2 } from "interfaces/order.interface";

export interface HomePageProps {
	orders: OrderInterfaceV2[],
	theme: string,
	userType: 'customer' | 'executor' | 'admin',
	userId: string,
}