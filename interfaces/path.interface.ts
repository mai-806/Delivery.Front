import { OrderPos } from "./order.interface"

export interface PathInterface {
    courierId: number,
    path: OrderPos[],
    time: number,
    cost: number,
}

export interface PathBodyInterface {
    courier: {
        id: number,
        position: OrderPos,
    },
    end_coordinate: OrderPos,
}