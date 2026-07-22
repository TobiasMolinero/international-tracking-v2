'use server';

import { revalidatePath } from 'next/cache';

import {
  ShipmentActionState,
  ShipmentFormData,
  shipmentFormSchema,
} from '@/components/admin/shipment-form/model';

import { createShipment, findShipmentBySaleNumber } from '@/lib/repositories/shipment.repository';

export async function createShipmentAction(values: ShipmentFormData): Promise<ShipmentActionState> {
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

    if (existingShipment) {
      return {
        success: false,
        errors: {
          nro_venta: 'Ya existe un envío con ese número de venta.',
        },
      };
    }

    await createShipment(normalizedValues);

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Envío registrado correctamente.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ocurrió un error al registrar el envío.',
    };
  }
}
