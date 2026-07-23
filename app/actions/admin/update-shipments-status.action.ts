'use server';

import { revalidatePath } from 'next/cache';

import { updateShipmentsStatusBySaleDate } from '@/lib/repositories/shipment.repository';

import { ShipmentActionState } from '@/components/admin/shipment-form/model';

interface ShipmentStatusUpdate {
  _id: string;
  fecha_venta: string;
  hold: boolean;
}

export async function updateShipmentsStatusAction(
  shipments: ShipmentStatusUpdate[]
): Promise<ShipmentActionState> {
  try {
    if (shipments.length === 0) {
      return {
        success: false,
        message: 'No se seleccionó ningún envío.',
      };
    }

    await updateShipmentsStatusBySaleDate(shipments);

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Estados actualizados correctamente.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ocurrió un error al actualizar los estados.',
    };
  }
}