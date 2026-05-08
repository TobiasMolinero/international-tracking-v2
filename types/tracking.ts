export type Shipment = {
  nro_venta: string;
  hbl: string;
  estado: string;
  contenedor_guia: string;
  fecha_envio: string;
  fecha_venta: string;
  nombre_consignatario: string;
  carnet_identidad: string;
  modelo?: string;
};