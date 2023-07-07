import { load } from '@2gis/mapgl';
import { Directions } from '@2gis/mapgl-directions';

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
