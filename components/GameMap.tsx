import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LatLng {
    lat: number;
    lng: number;
}

interface GameMapProps {
    onMapClick: (latlng: LatLng) => void;
}

const GameMap: React.FC<GameMapProps> = ({ onMapClick }) => {
    const [position, setPosition] = useState<LatLng | null>(null);

    const LocationMarker = () => {
        useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng;
                setPosition({ lat, lng });
                onMapClick({ lat, lng });
            },
        });

        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    };

    return (
        <div className="mb-4">
            <MapContainer center={[51.505, -0.09]} zoom={4} style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-md">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default GameMap;
