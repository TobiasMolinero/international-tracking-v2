'use server';

import { revalidatePath } from 'next/cache';

import {
  updateShipmentStatusBySaleDate,
} from '@/lib/repositories/shipment.repository';

import { ShipmentActionState } from '@/components/admin/shipment-form/model';

interface UpdateShipmentStatusParams {
  id: string;
  fecha_venta: string;
  hold: boolean;
}

export async function updateShipmentStatusAction({
  id,
  fecha_venta,
  hold,
}: UpdateShipmentStatusParams): Promise<ShipmentActionState> {
  try {
    await updateShipmentStatusBySaleDate(id, {
      fecha_venta,
      hold,
    });

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Estado actualizado correctamente.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ocurrió un error al actualizar el estado.',
    };
  }
}