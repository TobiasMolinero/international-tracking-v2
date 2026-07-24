import { DEFAULT_SHIPMENT_STATUS } from '@/lib/constants/shipment-status';

import { ShipmentFormData } from './shipment-form.schema';

export const shipmentFormDefaultValues: ShipmentFormData = {
  _id: undefined,

  nro_venta: '',
  fecha_venta: '',
  fecha_envio: '',
  estado: DEFAULT_SHIPMENT_STATUS,

  hbl: '',
  contenedor_guia: '',
  nombre_consignatario: '',
  carnet_identidad: '',
  comentario: '',

  hold: false,
};
