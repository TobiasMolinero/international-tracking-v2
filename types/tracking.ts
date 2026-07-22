export type Shipment = {
  _id: ShipmentId;
  nro_venta: string;
  hbl: string;
  estado: string;
  contenedor_guia: string;
  fecha_envio: string;
  fecha_venta: string;
  nombre_consignatario: string;
  carnet_identidad: string;
  modelo?: string;
  hold: boolean;
  comentario: string;
};

export type ShipmentId = string;

export type BulkAction = 'update' | 'delete' | null;