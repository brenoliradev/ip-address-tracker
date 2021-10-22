import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet';
import * as GeoSearch from 'leaflet-geosearch';

import { OpenStreetMapProvider } from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();
const search = new GeoSearch.GeoSearchControl({
    provider: new GeoSearch.OpenStreetMapProvider(),
})

const CustomMap = ({ lat, long, method }) => {

    return (
        <MapContainer 
            center={[lat, long]} 
            zoom={13} 
            scrollWheelZoom={true}
            style={{
                height: '85%',
                width: '100vw'
            }}
        >
            <MapConsumer>
                {(map) => {
                    console.log('map center:', map.flyTo([lat, long]))
                    console.log(map.addControl(search))

                    return null
                }}
            </MapConsumer>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
                position={[lat, long]}
            >
                <Popup>
                    Here's what you're looking <br/>
                    Thank you for using my project! :)
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default CustomMap;