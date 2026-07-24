export const SHIPMENT_STATUSES = [
  'EN DEPÓSITO ESPERANDO CONTENEDOR',
  'PAQUETE CARGADO EN CONTENEDOR',
  'CONTENEDOR EN CAMINO A CUBA',
  'CONTENEDOR ARRIBO A PUERTO MARIEL (CUBA)',
  'TRANSPORTE DE PUERTO MARIEL A ADUANA',
  'INGRESO A ADUANA EN CUBA',
  'Contenedor abierto - Rayos X',
  'Contenedor abierto - Unidad canina',
  'Proceso de desagrupe',
  'Próximo a entrega',
] as const;

export const DEFAULT_SHIPMENT_STATUS = SHIPMENT_STATUSES[0];