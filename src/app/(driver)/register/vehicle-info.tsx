import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/theme';
import PhotoUploadBox from '@/components/driver/PhotoUploadBox';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Toast from 'react-native-toast-message';

const createVehicleSchema = (isLux: boolean) => z.object({
    brand: z.string().min(2, "La marca es requerida"),
    model: z.string().min(2, "El modelo es requerido"),
    color: z.string().min(3, "El color es requerido"),
    year: z.coerce.number().min(isLux ? 2022 : 2017, `El año debe ser ${isLux ? '2022' : '2017'} o más reciente`),
    plate: z.string().min(5, "La placa es requerida").regex(/^[A-Z0-9-]+$/, "Formato de placa inválido"),
    insurancePolicy: z.string().optional(),
});


export default function VehicleInfoScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>(); 
  const isLux = type === 'lux';

  const vehicleSchema = createVehicleSchema(isLux);
  type VehicleFormData = z.infer<typeof vehicleSchema>;

  const { control, handleSubmit, formState: { errors } } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
        brand: '',
        model: '',
        color: '',
        plate: '',
        insurancePolicy: '',
    }
  });
  
  const [carPhoto, setCarPhoto] = useState<string>();
  const [extraPhoto, setExtraPhoto] = useState<string>();

  const onSubmit = (data: VehicleFormData) => {
    if (!carPhoto) {
        Alert.alert("Foto Faltante", "Por favor, sube una foto de tu vehículo.");
        return;
    }
    console.log(data);
    Toast.show({
      type: 'success',
      text1: 'Información Guardada',
      text2: 'Los datos de tu vehículo se han guardado correctamente.',
    });
    router.push('/(driver)/register/almost-there');
  };

  const FormInput = ({name, placeholder, control, error, ...props}: any) => (
    <View style={{marginBottom: 10}}>
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[styles.input, error && styles.inputError]}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    {...props}
                />
            )}
        />
        {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>
            Ingresa la Información de tu Vehículo {isLux ? 'Lux' : ''}
        </Text>
        
        <Text style={styles.sectionTitle}>Foto del Vehículo {isLux ? 'Lux' : ''}</Text>
        <View style={styles.photosRow}>
            <PhotoUploadBox label="Foto del Vehículo" imageUri={carPhoto} onImageSelected={setCarPhoto} />
            <PhotoUploadBox label="Otra (Opcional)" imageUri={extraPhoto} onImageSelected={setExtraPhoto} />
        </View>

        <Text style={styles.label}>Ingresa los datos de tu Vehículo:</Text>
        
        <FormInput name="brand" placeholder="Marca del Vehículo" control={control} error={errors.brand} />
        <FormInput name="model" placeholder="Modelo del vehículo" control={control} error={errors.model} />
        <FormInput name="color" placeholder="Color del vehículo" control={control} error={errors.color} />
        <FormInput name="year" placeholder={`Año de fabricación (no menor del año ${isLux ? '2022' : '2017'})`} control={control} error={errors.year} keyboardType="numeric" />
        <FormInput name="plate" placeholder="Número de Placa" control={control} error={errors.plate} autoCapitalize="characters" />
        <FormInput name="insurancePolicy" placeholder="Número de Póliza de seguro (opcional)" control={control} error={errors.insurancePolicy} />

        <View style={{alignItems: 'center', marginTop: 10}}>
             <Image source={require('@/assets/images/react-logo.png')} style={{width: 50, height: 30}} contentFit="contain"/>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', textAlign: 'center', marginBottom: 15 },
  photosRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, backgroundColor: '#fff', fontSize: 12 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 10, marginTop: 2, marginLeft: 5 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});