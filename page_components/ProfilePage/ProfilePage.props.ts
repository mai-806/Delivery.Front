export interface ProfilePageProps {
	theme: string,
	userType: 'customer' | 'executor' | 'admin',
	userId: string,
	username: string,
}