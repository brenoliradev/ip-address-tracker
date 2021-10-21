import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet';
import React from 'react';

const CustomMap = ({ lat, long }) => {
    
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
                    return null
                }}
            </MapConsumer>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]}>
                <Popup>
                    Thank you for using my project! :)
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default CustomMap;