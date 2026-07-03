import { useEffect, useState } from 'react';
import { fetchSpots } from '../api/spots';
import type { Spot } from '../types/spot';

export const useSpots = () => {
  const [state, setState] = useState<{ data: Spot[] }>();

  useEffect(() => {
    fetchSpots().then((data) => setState({ data }));
  }, []);

  return { data: state?.data ?? [] };
};
