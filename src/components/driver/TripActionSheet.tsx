import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Linking,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../constants/theme'; // Asegúrate que la ruta sea correcta

const { width } = Dimensions.get('window');
const BUTTON_HEIGHT = 55;
const BUTTON_WIDTH = width - 40;
const SWIPE_THRESHOLD = BUTTON_WIDTH * 0.6; // Deslizar al 60% para activar

// Definimos los estados del viaje para consistencia
export enum TripStatus {
  ACCEPTED = 'ACCEPTED',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

interface TripActionSheetProps {
  status: TripStatus;
  passengerName: string;
  passengerRating: number;
  passengerPhone: string;
  address: string;
  onAction: (newStatus: TripStatus) => void;
  onCancel: () => void;
}

const TripActionSheet = ({
  status,
  passengerName,
  passengerRating,
  passengerPhone,
  address,
  onAction,
  onCancel,
}: TripActionSheetProps) => {
  // Configuración dinámica según el estado
  const getConfig = () => {
    switch (status) {
      case TripStatus.ACCEPTED:
        return {
          actionText: 'Desliza para confirmar llegada',
          buttonColor: '#276EF1', // Azul Uber
          nextStatus: TripStatus.ARRIVED,
          icon: 'map-marker-check',
          hint: 'Dirígete al punto de recogida',
        };
      case TripStatus.ARRIVED:
        return {
          actionText: 'Desliza para iniciar viaje',
          buttonColor: '#05A357', // Verde
          nextStatus: TripStatus.IN_PROGRESS,
          icon: 'car-hatchback',
          hint: 'Espera al pasajero',
        };
      case TripStatus.IN_PROGRESS:
        return {
          actionText: 'Desliza para finalizar viaje',
          buttonColor: '#E11900', // Rojo
          nextStatus: TripStatus.COMPLETED,
          icon: 'flag-checkered',
          hint: 'En ruta al destino',
        };
      default:
        return null;
    }
  };

  const config = getConfig();
  
  // --- Lógica del Swipe Button ---
  const translateX = useRef(new Animated.Value(0)).current;
  const [completed, setCompleted] = useState(false);

  // Reseteamos el botón si cambia el estado
  useEffect(() => {
    translateX.setValue(0);
    setCompleted(false);
  }, [status]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (!config || completed) return;
        // Solo permitir movimiento a la derecha y dentro de los límites
        if (gestureState.dx > 0 && gestureState.dx <= BUTTON_WIDTH - BUTTON_HEIGHT) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!config || completed) return;
        
        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Acción completada
          setCompleted(true);
          Animated.timing(translateX, {
            toValue: BUTTON_WIDTH - BUTTON_HEIGHT,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            onAction(config.nextStatus);
          });
        } else {
          // Regresar al inicio (rebote)
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // Funciones auxiliares
  const handleCall = () => {
    Linking.openURL(`tel:${passengerPhone}`);
  };

  const handleMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
    });
    Linking.openURL(url || '');
  };

  if (!config) return null;

  return (
    <View style={styles.container}>
      {/* --- Cabecera: Info Pasajero --- */}
      <View style={styles.header}>
        <View style={styles.passengerInfo}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account" size={30} color="#fff" />
          </View>
          <View>
            <Text style={styles.passengerName}>{passengerName}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{passengerRating.toFixed(1)}</Text>
              <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
            </View>
          </View>
        </View>

        {/* Botones de acción rápida (Llamar / Seguridad) */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleCall}>
            <MaterialCommunityIcons name="phone" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onCancel}>
             <MaterialCommunityIcons name="cancel" size={24} color="#E11900" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {/* --- Cuerpo: Dirección --- */}
      <View style={styles.body}>
        <Text style={styles.hintText}>{config.hint}</Text>
        <View style={styles.addressRow}>
          <MaterialCommunityIcons name="navigation" size={20} color="#000" />
          <Text style={styles.addressText} numberOfLines={2}>{address}</Text>
          <TouchableOpacity onPress={handleMaps}>
             <Text style={styles.navLink}>Navegar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Footer: Swipe Button --- */}
      <View style={styles.footer}>
        <View style={[styles.swipeButtonContainer, { backgroundColor: config.buttonColor }]}>
          <Text style={styles.swipeText}>{config.actionText}</Text>
          
          <Animated.View
            style={[
              styles.swipeKnob,
              { transform: [{ translateX }] }
            ]}
            {...panResponder.panHandlers}
          >
            <MaterialCommunityIcons name={config.icon} size={24} color={config.buttonColor} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 2,
  },
  quickActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  body: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginHorizontal: 10,
  },
  navLink: {
    color: '#276EF1',
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  // Swipe Button Styles
  swipeButtonContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  swipeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 1,
  },
  swipeKnob: {
    width: BUTTON_HEIGHT - 4,
    height: BUTTON_HEIGHT - 4,
    borderRadius: (BUTTON_HEIGHT - 4) / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default TripActionSheet;