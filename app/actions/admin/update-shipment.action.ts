'use server';

import { revalidatePath } from 'next/cache';

import {
  ShipmentActionState,
  ShipmentFormData,
  shipmentFormSchema,
} from '@/components/admin/shipment-form/model';

import { findShipmentBySaleNumber, updateShipment } from '@/lib/repositories/shipment.repository';

export async function updateShipmentAction(values: ShipmentFormData): Promise<ShipmentActionState> {
  try {
    const result = shipmentFormSchema.safeParse(values);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === 'string') {
          errors[field] = issue.message;
        }
      });

      return {
        success: false,
        errors,
      };
    }

    const normalizedValues = {
      ...values,
      nro_venta: `v-${values.nro_venta}`,
    }

    const existingShipment = await findShipmentBySaleNumber(normalizedValues.nro_venta);

    if (existingShipment && existingShipment._id.toString() !== values._id) {
      return {
        success: false,
        errors: {
          nro_venta: 'Ya existe un envío con ese número de venta.',
        },
      };
    }
    
    const {
      _id,
      ...shipmentData
    } = normalizedValues;

    await updateShipment(_id!, shipmentData);

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Envío actualizado correctamente.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ocurrió un error al actualizar el envío.',
    };
  }
}
