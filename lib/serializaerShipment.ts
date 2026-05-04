export type Shipment = {
  nro_venta: string;
  hbl: string;
  estado: string;
  contenedor_guia: string;
  fecha_envio: string;
  fecha_venta: string;
  nombre_consignatario: string;
  carnet_identidad: string;
};

export const serializeShipment = (doc: any): Shipment => ({
  nro_venta: doc.nro_venta ?? '',
  hbl: doc.hbl ?? '',
  estado: doc.estado ?? '',
  contenedor_guia: doc.contenedor_guia ?? '',
  fecha_envio: doc.fecha_envio ?? '',
  fecha_venta: doc.fecha_venta ?? '',
  nombre_consignatario: doc.nombre_consignatario ?? '',
  carnet_identidad: doc.carnet_identidad ?? '',
});