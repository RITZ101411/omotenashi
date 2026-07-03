import { useEffect, useState } from 'react';

type GeolocationState = {
  latitude: number;
  longitude: number;
  isPending: boolean;
  error: string | null;
};

export const useGeolocation = () => {
  // 位置情報の取得には時間がかかり、それまでは無関係な座標になってしまうため、初期値としてハッカソン本番会場の座標を設定してます。
  const [state, setState] = useState<GeolocationState>({
    latitude: 35.53,
    longitude: 139.6945,
    isPending: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ ...state, error: 'Geolocation is not supported by your browser', isPending: false });
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setState({ latitude, longitude, isPending: false, error: null });
    };

    const handleError = (error: GeolocationPositionError) => {
      setState({ ...state, error: error.message, isPending: false });
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return state;
};
