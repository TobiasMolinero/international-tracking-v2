import { z } from 'zod';

export const shipmentFormSchema = z.object({
  saleNumber: z.string().min(1, 'El número de venta es obligatorio'),

  saleDate: z.string().min(1, 'La fecha de venta es obligatoria'),

  departureDate: z.string(),

  status: z.string().min(1),

  hbl: z.string(),

  guideContainer: z.string(),

  consigneeName: z.string(),

  consigneeIdentity: z.string(),

  hold: z.boolean(),
});

export type ShipmentFormSchema = z.infer<typeof shipmentFormSchema>;