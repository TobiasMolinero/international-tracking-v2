export function getCurrentStepIndex(estado: string) {
    return steps.findIndex(step => step.key === estado);
}

export const steps = [
  {
    id: 1,
    side: 'left',
    key: 'DEPOSITO',
    title: 'EN DEPÓSITO ESPERANDO CONTENEDOR',
    description:
      'Tu vehículo ya se encuentra en nuestro depósito, con toda la documentación lista. En este momento está en espera para ser cargada en el próximo contenedor.',
    icon: '/icons/deposito.png',
  },
  {
    id: 2,
    side: 'right',
    key: 'CARGADO',
    title: 'PAQUETE CARGADO EN CONTENEDOR',
    description:
      'Tu vehículo ya fue cargado en el contenedor. En este momento estamos terminando de completar la carga con los demás vehículos, y una vez finalizado, el contenedor ya sale rumbo a Cuba.',
    icon: '/icons/envase.png',
  },
  {
    id: 3,
    side: 'left',
    key: 'EN_CAMINO',
    title: 'CONTENEDOR EN CAMINO A CUBA',
    description:
      'Tu vehículo ya está en camino a Cuba: el contenedor salió y se encuentra en el mar.',
    icon: '/icons/envio.png',
  },
  {
    id: 4,
    side: 'right',
    key: 'ARRIBO_PUERTO',
    title: 'CONTENEDOR ARRIBÓ A PUERTO MARIEL',
    description:
      'Te cuento que el contenedor ya llegó a Cuba y se encuentra actualmente en el puerto de Mariel. A partir de acá comienza el proceso de ingreso y verificación.',
    icon: '/icons/ancla.png',
  },
  {
    id: 5,
    side: 'left',
    key: 'TRANSPORTE_ADUANA',
    title: 'TRANSPORTE DE PUERTO MARIEL HACIA ADUANA',
    description: '',
    icon: '/icons/rapido.png',
  },
  {
    id: 6,
    side: 'right',
    key: 'INGRESO_ADUANA',
    title: 'INGRESO A ADUANA DE CUBA',
    description: 'El vehículo ya ingresó a la aduana de Cuba para su verificación.',
    icon: '/icons/inspeccion.png',
  },
  {
    id: 7,
    side: 'left',
    key: 'PROCESO_RAYOS_X',
    title: 'PROCESO DE ADUANA – RAYOS X',
    description: '',
    icon: '/icons/inspeccion.png',
  },
  {
    id: 8,
    side: 'right',
    key: 'PROCESO_CANINA',
    title: 'PROCESO DE ADUANA – UNIDAD CANINA',
    description: '',
    icon: '/icons/perro-policia.png',
  },
  {
    id: 9,
    side: 'left',
    key: 'PROCESO_DESAGRUPE',
    title: 'PROCESO DE DESAGRUPE',
    description:
      'El vehículo se encuentra en la etapa de desagrupe, donde se están separando y organizando las unidades para preparar las entregas.',
    icon: '/icons/desagrupe.png',
  },
  {
    id: 10,
    side: 'right',
    key: 'PROXIMO_ENTREGA',
    title: 'PRÓXIMO A ENTREGA',
    description:
      'La agencia de envios se estara comunicando en los proximos dias para coordinar la entrega de tu vehiculo.',
    icon: '/icons/proximo-entrega.png',
  },
];
