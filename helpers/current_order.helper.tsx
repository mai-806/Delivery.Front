import axios, { AxiosResponse } from "axios";
import { OrderInterfaceV2 } from "interfaces/order.interface";
import { addressHelper } from "./address.helper";

export async function currentOrder(setCurrentOrderNumber: (e: any) => void, setCurrentCustomer: (e: any) => void,
setCurrentWF: (e: any) => void, setCurrentWT: (e: any) => void, setCurrentDetails: (e: any) => void) {
    let currentorderId = localStorage.getItem('currentOrderId');

    if (currentorderId) {
        let { data: order }: AxiosResponse<OrderInterfaceV2> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/v1/order/?id='
            + currentorderId);

        setCurrentOrderNumber(order.orderId);
        setCurrentCustomer(order.customerId);
        setCurrentWF(addressHelper(order.start.lon, order.start.lat));
        setCurrentWT(addressHelper(order.finish.lon, order.finish.lat));
        setCurrentDetails(order.status);
    } else {
        setCurrentOrderNumber('-');
        setCurrentCustomer('-');
        setCurrentWF('-');
        setCurrentWT('-');
        setCurrentDetails('-');
    }
}