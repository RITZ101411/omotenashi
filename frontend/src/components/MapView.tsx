import { useEffect, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-maplibre';
import { useGeolocation } from '../hooks/useGeolocation';
import type { Spot } from '../types/spot';
import 'maplibre-gl/dist/maplibre-gl.css';

type MapViewProps = {
  spots: Spot[];
  onSpotClick?: (spot: Spot) => void;
};

export const MapView = ({ spots, onSpotClick }: MapViewProps) => {
  const [viewState, setViewState] = useState({ zoom: 14 });
  const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    setViewState((prev) => ({ ...prev, latitude, longitude }));
  }, [latitude, longitude]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          latitude={spot.lat}
          longitude={spot.lng}
          onClick={() => onSpotClick?.(spot)}
        />
      ))}
    </Map>
  );
};
