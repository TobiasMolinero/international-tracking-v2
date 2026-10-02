'use server';

import { revalidatePath } from 'next/cache';

import { updateShipmentStatus } from '@/lib/repositories/shipment.repository';

import { ShipmentActionState } from '@/components/admin/shipment-form/model';

interface UpdateShipmentStatusParams {
  id: string;
  fecha_venta: string;
  hold: boolean;
  currentStatus: string;
  fecha_reanudacion: string;
  reanudado: boolean;
}

export async function updateShipmentStatusAction({
  id,
  fecha_venta,
  hold,
  currentStatus,
  fecha_reanudacion,
  reanudado,
}: UpdateShipmentStatusParams): Promise<ShipmentActionState> {
  try {
    await updateShipmentStatus(
      id,
      {
        fecha_venta,
        hold,
        fecha_reanudacion,
        reanudado,
      },
      currentStatus
    );

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Estado actualizado correctamente.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Ocurrió un error al actualizar el estado.',
    };
  }
}
