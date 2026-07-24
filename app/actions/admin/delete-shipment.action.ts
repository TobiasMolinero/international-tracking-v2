'use server';

import { revalidatePath } from 'next/cache';

import {
  deleteShipment,
} from '@/lib/repositories/shipment.repository';

import { ShipmentActionState } from '@/components/admin/shipment-form/model';

export async function deleteShipmentAction(
  id: string
): Promise<ShipmentActionState> {
  try {
    await deleteShipment(id);

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Envío eliminado correctamente.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ocurrió un error al eliminar el envío.',
    };
  }
}