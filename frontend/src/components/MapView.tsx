import { useState } from 'react';
import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export const MapView = () => {
  const [viewState, setViewState] = useState({
    latitude: 35.681236,
    longitude: 139.767125,
    zoom: 14,
  });

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    />
  );
};
