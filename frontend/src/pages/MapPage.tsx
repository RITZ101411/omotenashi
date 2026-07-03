import { MapView } from "../components/MapView";
import { useSpots } from "../hooks/useSpots";

const MapPage = () => {
  const { data: spots } = useSpots();

  return (
    <div className="h-screen w-screen">
      <MapView spots={spots} />
    </div>
  );
};

export default MapPage;
