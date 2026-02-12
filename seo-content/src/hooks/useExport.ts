import { useCallback } from 'react';
import { api } from '../lib/api';

export function useExport() {
  const exportCity = useCallback((city: string) => {
    api.exportCity(city);
  }, []);

  return { exportCity };
}
