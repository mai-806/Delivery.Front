import { load } from '@2gis/mapgl';
import { Directions } from '@2gis/mapgl-directions';
import axios, { AxiosResponse } from 'axios';
import { PathBodyInterface, PathInterface } from 'interfaces/path.interface';

export async function map(theme: string, router: any, setWhereFrom: (e: any) => void,
    setWhereTo: (e: any) => void) {
    let map: any;
    let longitude: any;
    let latitude: any;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
    
            load().then((mapglAPI) => {
                if (theme === 'light') {
                    map = new mapglAPI.Map('map', {
                        center: [longitude, latitude],
                        zoom: 13,
                        key: '784b7bf3-8e42-4f4c-8ba5-64aab1274cae',
                        lang: router.locale,
                        style: 'add11b0a-e1ad-4b39-8d87-3fa4c80550ce'
                    });
                } else {
                    map = new mapglAPI.Map('map', {
                        center: [longitude, latitude],
                        zoom: 13,
                        key: '784b7bf3-8e42-4f4c-8ba5-64aab1274cae',
                        lang: router.locale,
                        style: '2b68bd2c-5b29-41f5-acd7-510f1b15b5c7'
                    });
                }
    
                const directions = new Directions(map, {
                    directionsApiKey: '784b7bf3-8e42-4f4c-8ba5-64aab1274cae',
                });
                const markers: any[] = [];
                let firstPoint: any;
                let secondPoint: any;
                
                let selecting = 'a';
                const controlsHtml = `<button id="reset">Reset points</button> `;
                new mapglAPI.Control(map, controlsHtml, {
                    position: 'topLeft',
                });
                const resetButton = document.getElementById('reset');
                resetButton?.addEventListener('click', function() {
                    selecting = 'a';
                    firstPoint = undefined;
                    secondPoint = undefined;
                    directions.clear();
                });
                map.on('click', (e: any) => {
                    const coords = e.lngLat;
                    if (selecting != 'end') {
                        // Just to visualize selected points, before the route is done
                        markers.push(
                            new mapglAPI.Marker(map, {
                                coordinates: coords,
                                icon: 'https://docs.2gis.com/img/dotMarker.svg',
                            }),
                        );
                    }
                    if (selecting === 'a') {
                        firstPoint = coords;
                        selecting = 'b';
                        setWhereFrom({
                            lon: firstPoint[0],
                            lat: firstPoint[1],
                        });
                    } else if (selecting === 'b') {
                        secondPoint = coords;
                        selecting = 'end';
                        setWhereTo({
                            lon: secondPoint[0],
                            lat: secondPoint[1],
                        });
                    }
                    // If all points are selected — we can draw the route
                    if (firstPoint && secondPoint) {
                        directions.carRoute({
                            points: [firstPoint, secondPoint],
                        });
                        markers.forEach((m) => {
                            m.destroy();
                        });
                    }
                });
            });
        });
    }
}

let pathCourier: PathInterface;

export async function getPath(courierId: string, whereFromLon: number, whereFromLat: number,
    whereToLon: number, whereToLat: number) {
    let pathBody: PathBodyInterface = {
        courier: {
            id: +courierId,
            position: {
                lon: whereFromLon,
                lat: whereFromLat,
            },
        },
        end_coordinate: {
            lon: whereToLon,
            lat: whereToLat,
        },
    }

    let { data: path }: AxiosResponse<PathInterface> = await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/v1/path/', pathBody);

    pathCourier = path
}

pathCourier = {
    courierId: 0,
    path: [
      {
        lon: 37.48016242966374,
        lat: 55.91275668569521
      },
      {
        lon: 37.76953296839845,
        lat: 55.911248239108865
      }
    ],
    time: 300,
    cost: 100.05
}

export async function mapCourier(theme: string, router: any) {
    let map: any;
    let longitude: any;
    let latitude: any;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
    
            load().then((mapglAPI) => {
                if (theme === 'light') {
                    map = new mapglAPI.Map('mapCourier', {
                        center: [pathCourier?.path[0].lon, pathCourier?.path[0].lat],
                        zoom: 13,
                        key: '784b7bf3-8e42-4f4c-8ba5-64aab1274cae',
                        lang: router.locale,
                        style: 'add11b0a-e1ad-4b39-8d87-3fa4c80550ce'
                    });
                } else {
                    map = new mapglAPI.Map('mapCourier', {
                        center: [longitude, latitude],
                        zoom: 13,
                        key: '784b7bf3-8e42-4f4c-8ba5-64aab1274cae',
                        lang: router.locale,
                        style: '2b68bd2c-5b29-41f5-acd7-510f1b15b5c7'
                    });
                }
    
                const directions = new Directions(map, {
                    directionsApiKey: '784b7bf3-8e42-4f4c-8ba5-64aab1274cae',
                });

                let pathDots = [];

                for (let i = 0; i < pathCourier?.path.length; i++) {
                    let dot = [];
                    dot.push(pathCourier?.path[i].lon);
                    dot.push(pathCourier?.path[i].lat);
                    pathDots.push(dot);
                }

                directions.carRoute({
                    points: pathDots,
                });
            });
        });
    }
}
