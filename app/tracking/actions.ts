'use server';

import clientPromise from '@/lib/mongodb';
import { serializeShipment } from '@/lib/serializaerShipment';

export async function searchTracking(prevState: any, formData: FormData) {
  const code = formData.get('trackingNumber')?.toString();

  // validación básica
  if (!code) {
    throw new Error('Código requerido');
  }

  try {
    const client = await clientPromise;
    const db = client.db('argmotors-track');

    const doc = await db.collection('envios').findOne({ nro_venta: `v-${code}` });

    if (!doc) {
      return { shipment: null, error: 'No encontrado' };
    }

    const shipment = serializeShipment(doc);

    return {
      shipment,
      error: null,
    };
  } catch (error) {
    return { shipment: null, error: 'Error del servidor' };
  }
}
