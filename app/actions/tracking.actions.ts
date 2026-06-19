'use server';

import { serializeShipment } from '@/lib/serializaerShipment';
import { findShipmentBySaleNumber } from '@/lib/repositories/shipment.repository';

export async function searchTracking(prevState: any, formData: FormData) {
  const code = formData.get('trackingNumber')?.toString();

  // validación básica
  if (!code) {
    throw new Error('Código requerido');
  }

  const shipment = await findShipmentBySaleNumber(`v-${code}`);

  if (!shipment) {
    return { shipment: null, error: 'No encontrado' };
  }

  return {
    shipment: serializeShipment(shipment),
    error: null,
  };
}
