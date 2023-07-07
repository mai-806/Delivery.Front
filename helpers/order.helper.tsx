import axios, { AxiosResponse } from "axios";
import { OrderPos } from "interfaces/order.interface";

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