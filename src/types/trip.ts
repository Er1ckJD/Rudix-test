// Definimos el estado posible de un viaje
export type TripStatus = 'completed' | 'cancelled';

// Definimos la estructura de la información del conductor
export interface DriverInfo {
  id: string;
  name: string;
  photoUrl: string; // URL de su foto
  vehicleModel: string;
  vehiclePlate: string;
  rating: number;
}

// Definimos la estructura principal de un Viaje
export interface Trip {
  id: string;
  date: string; // Ej: "19 Dic, 10:30 AM"
  pickupAddress: string;
  dropoffAddress: string;
  price: string; // Ej: "$150.50 MXN"
  status: TripStatus;
  // Datos extra para la vista de detalles
  distance?: string;
  duration?: string;
  driver?: DriverInfo;
  mapImageUrl?: string; // URL de una imagen estática del mapa (opcional)
}