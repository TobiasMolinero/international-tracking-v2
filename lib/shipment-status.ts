import { DEFAULT_SHIPMENT_STATUS } from './constants/shipment-status';

const HOLD_STATUS = 'CONTENEDOR ARRIBÓ A PUERTO MARIEL (CUBA)';

const PRE_RESTART_STATUS_RANGES = [
  { min: 1, max: 5, status: 'EN DEPÓSITO ESPERANDO CONTENEDOR' },
  { min: 6, max: 11, status: 'PAQUETE CARGADO EN CONTENEDOR' },
  { min: 12, max: 20, status: 'CONTENEDOR EN CAMINO A CUBA' },
  { min: 21, max: Infinity, status: 'CONTENEDOR ARRIBÓ A PUERTO MARIEL (CUBA)' },
];

const POST_RESTART_STATUS_RANGES = [
  { min: 1, max: 10, status: 'TRANSPORTE DE PUERTO MARIEL A ADUANA' },
  { min: 11, max: 21, status: 'INGRESO A ADUANA' },
  { min: 22, max: 28, status: 'Contenedor abierto - Rayos X' },
  { min: 29, max: 34, status: 'Contenedor abierto - Unidad canina' },
  { min: 35, max: 44, status: 'Proceso de desagrupe' },
  { min: 45, max: Infinity, status: 'Próximo a entrega' },
] as const;

interface ShipmentStatusInput {
  fecha_venta: string;
  hold: boolean;
  fecha_reanudacion: string;
  reanudado: boolean;
}

export function calculateShipmentStatus({
  fecha_venta,
  hold,
  fecha_reanudacion,
  reanudado,
}: ShipmentStatusInput): string {
  const today = new Date();

  const baseDate =
    reanudado && fecha_reanudacion ? new Date(fecha_reanudacion) : new Date(fecha_venta);

  const diffDays = Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  if (hold && !reanudado && diffDays >= 21) {
    return HOLD_STATUS;
  }

  const ranges = reanudado ? POST_RESTART_STATUS_RANGES : PRE_RESTART_STATUS_RANGES; 

  const range = ranges.find(({ min, max }) => diffDays >= min && diffDays <= max);

  return range?.status ?? DEFAULT_SHIPMENT_STATUS;
}
