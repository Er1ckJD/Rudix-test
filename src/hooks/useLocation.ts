import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      let { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (!canAskAgain) {
          setErrorMsg('Permisos bloqueados permanentemente. Debes habilitarlos desde Configuración del dispositivo.');
        } else {
          setErrorMsg('Permisos de ubicación denegados. Por favor habilítalos en Configuración.');
        }
        setHasPermission(false);
        return;
      }
      setHasPermission(true);

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Could not fetch location.');
      }
    })();
  }, []);

  return { location, errorMsg, hasPermission };
}
