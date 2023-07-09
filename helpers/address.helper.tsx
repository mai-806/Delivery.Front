import axios from "axios";

export async function addressHelper(lon: number, lat: number): Promise<any> {
	await axios.get(
        "https://catalog.api.2gis.com/3.0/items/geocode?lon=" + lon + "&lat=" + lat + "&fields=items.point&key=784b7bf3-8e42-4f4c-8ba5-64aab1274cae"
    ).then(function (result) {
        return result.data.result.items[0].full_name;
    })
    .catch(function (error) {
        console.log("Ошибка HTTP при получении адреса: " + error);
    });
}