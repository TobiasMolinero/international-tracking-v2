'use server';

import { revalidatePath } from 'next/cache';

import { deleteShipments } from '@/lib/repositories/shipment.repository';

import { ShipmentActionState } from '@/components/admin/shipment-form/model';

export async function deleteShipmentsAction(
  ids: string[]
): Promise<ShipmentActionState> {
  try {
    if (ids.length === 0) {
      return {
        success: false,
        message: 'No se seleccionó ningún envío.',
      };
    }

    await deleteShipments(ids);

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Envíos eliminados correctamente.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ocurrió un error al eliminar los envíos.',
    };
  }
}