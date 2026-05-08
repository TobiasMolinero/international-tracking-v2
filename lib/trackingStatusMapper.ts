const normalize = (text: string) =>
  text
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // elimina tildes

export const mapEstadoToStep = (estado: string): string => {
  const normalized = normalize(estado);

  const mapping: Record<string, string> = {
    'EN DEPÓSITO ESPERANDO CONTENEDOR': 'DEPOSITO',
    'PAQUETE CARGADO EN CONTENEDOR': 'CARGADO',
    'CONTENEDOR EN CAMINO A CUBA': 'EN_CAMINO',
    'CONTENEDOR ARRIBO A PUERTO MARIEL (CUBA)': 'ARRIBO_PUERTO',
    'TRANSPORTE DE PUERTO MARIEL A ADUANA': 'TRANSPORTE_ADUANA',
    'INGRESO A ADUANA EN CUBA': 'INGRESO_ADUANA',
    'Contenedor abierto - Rayos X': 'PROCESO_RAYOS_X',
    'Contenedor abierto - Unidad canina': 'PROCESO_CANINA',
    'Proceso de desagrupe': 'PROCESO_DESAGRUPE',
    'Próximo a entrega': 'PROXIMO_ENTREGA',
  };

  return mapping[normalized] || 'DEPOSITO';
};