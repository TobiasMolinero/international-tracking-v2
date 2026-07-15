import { DEFAULT_SHIPMENT_STATUS } from '@/lib/constants/shipment-status';

import { ShipmentFormData } from './shipment-form.schema';

export const shipmentFormDefaultValues: ShipmentFormData = {
  _id: undefined,

  saleNumber: '',
  saleDate: '',
  departureDate: '',
  status: DEFAULT_SHIPMENT_STATUS,

  hbl: '',
  guideContainer: '',
  consigneeName: '',
  consigneeIdentity: '',

  hold: false,
};
