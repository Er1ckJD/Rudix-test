import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme'; // Ajusta según tu estructura

interface TripSummaryModalProps {
  visible: boolean;
  price: number;
  paymentMethod: 'cash' | 'card';
  passengerName: string;
  onComplete: (rating: number) => void;
}

const TripSummaryModal = ({ 
  visible, 
  price, 
  paymentMethod, 
  passengerName, 
  onComplete 
}: TripSummaryModalProps) => {
  const [rating, setRating] = useState(0);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.cardContainer}>
          
          {/* Header: Éxito */}
          <View style={styles.header}>
            <View style={styles.checkCircle}>
              <MaterialCommunityIcons name="check" size={40} color="#fff" />
            </View>
            <Text style={styles.title}>Viaje Finalizado</Text>
            <Text style={styles.subtitle}>Llegaste a tu destino</Text>
          </View>

          <View style={styles.divider} />

          {/* Sección de Cobro */}
          <View style={styles.paymentSection}>
            <Text style={styles.collectLabel}>Cobrar al pasajero</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            
            <View style={styles.methodTag}>
              <MaterialCommunityIcons 
                name={paymentMethod === 'cash' ? 'cash' : 'credit-card'} 
                size={20} 
                color="#333" 
              />
              <Text style={styles.methodText}>
                {paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}
              </Text>
            </View>

            {paymentMethod === 'cash' && (
              <Text style={styles.cashWarning}>
                Recuerda cobrar el efectivo antes de que baje el pasajero.
              </Text>
            )}
          </View>

          {/* Sección de Calificación */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>¿Cómo estuvo {passengerName}?</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => setRating(star)}
                  style={styles.starButton}
                >
                  <MaterialCommunityIcons 
                    name={rating >= star ? "star" : "star-outline"} 
                    size={40} 
                    color="#FFD700" 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botón Finalizar */}
          <TouchableOpacity 
            style={[styles.completeButton, { opacity: rating > 0 ? 1 : 0.5 }]}
            disabled={rating === 0}
            onPress={() => onComplete(rating)}
          >
            <Text style={styles.buttonText}>Finalizar y Volver</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  paymentSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  collectLabel: {
    fontSize: 14,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  price: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000',
  },
  methodTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: '#333',
  },
  cashWarning: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#FFEBEE',
    padding: 8,
    borderRadius: 8,
    width: '100%',
  },
  ratingSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  starButton: {
    padding: 5,
  },
  completeButton: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TripSummaryModal;