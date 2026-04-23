'use server';

import clientPromise from '@/lib/mongodb';

export async function searchTracking(prevState: any, formData: FormData) {
  const code = formData.get('trackingNumber')?.toString();

  // validación básica
  if (!code) {
    throw new Error('Código requerido');
  }

  try {
    const client = await clientPromise;
    const db = client.db('argmotors-track');

    const shipment = await db.collection('envios').findOne({ nro_venta: `v-${code}` });

    if (!shipment) {
      return { data: null, error: 'No encontrado' };
    }

    return {
      shipment,
      error: null,
    };
  } catch (error) {
    return { data: null, error: 'Error del servidor' };
  }
}
