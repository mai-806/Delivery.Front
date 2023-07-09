export interface gisPlaceInterface {
    meta: {
        api_version: string,
        code: number,
        issue_date: string,
    },
    result: {
        items: [
            {
                address_name: string,
                full_name: string,
                id: string,
                name: string,
                point: {
                    lat: number,
                    lon: number,
                },
                purpose_name: string,
                type: string,
            }
        ],
        total: number,
    },
}