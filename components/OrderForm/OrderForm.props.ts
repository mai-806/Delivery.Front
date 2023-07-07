import { OrderPos } from "interfaces/order.interface";

export interface OrderFormProps {
    theme: string,
    isMap: boolean,
    whereFrom: OrderPos | undefined,
    setWhereFrom: (e: any) => void,
    whereTo: OrderPos | undefined,
    setWhereTo: (e: any) => void,
    details: string,
    setDetails: (e: any) => void,
    isErrorWF: boolean,
    isErrorWT: boolean,
}