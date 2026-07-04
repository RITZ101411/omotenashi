import { Image } from 'react-native';
import { Camera, Map, Marker } from '@maplibre/maplibre-react-native';
import type { Spot } from '../data/mock-spots';

type MapViewProps = {
  spots: Spot[];
  onSpotPress?: (spot: Spot) => void;
};

const INITIAL_CENTER: [number, number] = [139.6945, 35.53];

export function MapView({ spots, onSpotPress }: MapViewProps) {
  return (
    <Map style={{ flex: 1 }} mapStyle="https://tiles.openfreemap.org/styles/bright">
      <Camera initialViewState={{ center: INITIAL_CENTER, zoom: 16 }} />
      {spots.map(
        (spot) =>
          spot.photo_url && (
            <Marker
              key={spot.id}
              id={String(spot.id)}
              lngLat={[spot.lng, spot.lat]}
              onPress={() => onSpotPress?.(spot)}
            >
              <Image source={{ uri: spot.photo_url }} className="h-14 w-14 rounded-md border-2 border-white bg-white" />
            </Marker>
          ),
      )}
    </Map>
  );
}
