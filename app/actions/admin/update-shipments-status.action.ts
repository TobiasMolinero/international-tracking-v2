'use server';

import { revalidatePath } from 'next/cache';

import { updateShipmentsStatus } from '@/lib/repositories/shipment.repository';

import { ShipmentActionState } from '@/components/admin/shipment-form/model';

interface ShipmentStatusUpdate {
  _id: string;
  fecha_venta: string;
  hold: boolean;
  fecha_reanudacion: string;
  reanudado: boolean;
  estado: string
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

    await updateShipmentsStatus(shipments);

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Estados actualizados correctamente.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Ocurrió un error al actualizar los estados.',
    };
  }
}