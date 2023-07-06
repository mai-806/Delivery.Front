import axios, { AxiosResponse } from "axios";
import { OrderPos } from "interfaces/order.interface";

export async function orderPost(userId: string, start: OrderPos, finish: OrderPos) {
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