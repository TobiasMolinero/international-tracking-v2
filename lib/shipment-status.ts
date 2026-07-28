import { DEFAULT_SHIPMENT_STATUS } from './constants/shipment-status';

const HOLD_STATUS = 'CONTENEDOR ARRIBÓ A PUERTO MARIEL (CUBA)'

const STATUS_RANGES = [
  { min: 1, max: 5, status: 'EN DEPÓSITO ESPERANDO CONTENEDOR' },
  { min: 6, max: 11, status: 'PAQUETE CARGADO EN CONTENEDOR' },
  { min: 12, max: 20, status: 'CONTENEDOR EN CAMINO A CUBA' },
  { min: 21, max: 51, status: 'CONTENEDOR ARRIBÓ A PUERTO MARIEL (CUBA)' },
  { min: 52, max: 62, status: 'TRANSPORTE DE PUERTO MARIEL A ADUANA' },
  { min: 63, max: 73, status: 'INGRESO A ADUANA' },
  { min: 74, max: 80, status: 'Contenedor abierto - Rayos X' },
  { min: 81, max: 86, status: 'Contenedor abierto - Unidad canina' },
  { min: 87, max: 96, status: 'Proceso de desagrupe' },
  { min: 97, max: Infinity, status: 'Próximo a entrega' },
] as const;

interface ShipmentStatusInput {
  fecha_venta: string;
  hold: boolean;
}

export function calculateShipmentStatus({ fecha_venta, hold }: ShipmentStatusInput): string {
  const saleDate = new Date(fecha_venta);
  const today = new Date();

  const diffDays = Math.floor((today.getTime() - saleDate.getTime()) / (1000 * 60 * 60 * 24));

  if (hold && diffDays >= 21) {
    return HOLD_STATUS;
  }

  const range = STATUS_RANGES.find(({ min, max }) => diffDays >= min && diffDays <= max);

  return range?.status ?? DEFAULT_SHIPMENT_STATUS;
}
