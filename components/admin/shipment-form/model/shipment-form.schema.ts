import { z } from 'zod';

export const shipmentFormSchema = z.object({
  _id: z.string().optional(),

  nro_venta: z.string().trim().min(1, 'El número de venta es obligatorio'),

  fecha_venta: z.string().min(1, 'La fecha de venta es obligatoria'),

  fecha_envio: z.string(),

  estado: z.string().min(1, 'Seleccione un estado'),

  hbl: z.string(),

  contenedor_guia: z.string(),

  nombre_consignatario: z.string(),

  carnet_identidad: z.string(),

  comentario: z.string(),

  hold: z.boolean(),
});

export type ShipmentFormData = z.infer<typeof shipmentFormSchema>;
