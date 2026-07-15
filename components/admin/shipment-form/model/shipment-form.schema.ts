import { z } from 'zod';

export const shipmentFormSchema = z.object({
  _id: z.string().optional(),

  saleNumber: z.string().trim().min(1, 'El número de venta es obligatorio'),

  saleDate: z.string().min(1, 'La fecha de venta es obligatoria'),

  departureDate: z.string(),

  status: z.string().min(1, 'Seleccione un estado'),

  hbl: z.string(),

  guideContainer: z.string(),

  consigneeName: z.string(),

  consigneeIdentity: z.string(),

  hold: z.boolean(),
});

export type ShipmentFormData = z.infer<typeof shipmentFormSchema>;
