export interface OrderInterface {
    id: number,
    date: string,
    customer: string,
    executor: string,
    whereFrom: string,
    whereTo: string,
    details: string,
}

export interface OrderInterfaceV2 {
    customerId: string,
    start: OrderPos,
    finish: OrderPos,
}

export interface OrderPos {
    lon: number,
    lat: number,
}