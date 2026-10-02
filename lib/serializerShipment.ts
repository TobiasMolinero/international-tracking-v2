import { Shipment } from "@/types/tracking";

export const serializeShipment = (doc: any): Shipment => ({
  _id: doc._id?.toString() ?? '',
  nro_venta: doc.nro_venta ?? '',
  hbl: doc.hbl ?? '',
  estado: doc.estado ?? '',
  contenedor_guia: doc.contenedor_guia ?? '',
  fecha_envio: doc.fecha_envio ?? '',
  fecha_venta: doc.fecha_venta ?? '',
  nombre_consignatario: doc.nombre_consignatario ?? '',
  carnet_identidad: doc.carnet_identidad ?? '',
  comentario: doc.comentario ?? '',
  hold: doc.hold ?? false,
  updated_status_date: doc.updated_status_date ?? '',
  fecha_reanudacion: doc.fecha_reanudacion ?? '',
  reanudado: doc.reanudado ?? false,
});