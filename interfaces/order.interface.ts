export interface OrderInterface {
    id: number,
    date?: string,
    customer: string,
    executor: string,
    whereFrom: string,
    whereTo: string,
    details: string,
}

export interface OrderInterfaceV2 {
    orderId: string,
    customerId: string,
    start: OrderPos,
    finish: OrderPos,
    status: "new",
}

export interface OrderPos {
    lon: any,
    lat: any,
}