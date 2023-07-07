import axios, { AxiosResponse } from "axios";
import { ToastSuccess } from "components/Toast/Toast";
import { OrderInterfaceV2, OrderPos } from "interfaces/order.interface";
import { setLocale } from "./locale.helper";

export async function orderPost(userId: string, whereFrom: OrderPos, whereTo: OrderPos) {
    let start: OrderPos = {
        lon: whereFrom.lon,
        lat: whereFrom.lat,
    };

    let finish: OrderPos = {
        lon: whereTo.lon,
        lat: whereTo.lat,
    };

    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/order/', {
        customer_id: userId,
        start: start,
        finish: finish,
    }).then(function () {            
        console.log("OK");
    })
    .catch(function (error) {
        console.log("Ошибка HTTP при создании пользователя: " + error);
    });  
}

export async function orderGet(setOrders: (e: any) => void) {
    let { data: orders }: AxiosResponse<OrderInterfaceV2[]> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/v1/orders/');

    setOrders(orders);
}

export async function orderAssign(router: any, isActive: boolean, setIsActive: (e: any) => void,
    orderId: number, userId: string) {
    if (!isActive) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/couries/assign', {
            order_id: orderId,
            courier_id: userId,
        }).catch(function (error) {
            console.log("Ошибка HTTP при назначении курьера: " + error);
        });  

        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/order/change-status', {
            order_id: orderId,
            status: "waiting",
        }).then(function () {            
            setIsActive(true);
            ToastSuccess(setLocale(router.locale).cool + '!');
        })
        .catch(function (error) {
            console.log("Ошибка HTTP при принятии заказа: " + error);
        });  
    } else {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/order/change-status', {
            order_id: orderId,
            status: "finished",
        }).then(function () {            
            setIsActive(false);
            ToastSuccess(setLocale(router.locale).cool + '!');
        })
        .catch(function (error) {
            console.log("Ошибка HTTP при завершении заказа: " + error);
        });  
    }
    
}