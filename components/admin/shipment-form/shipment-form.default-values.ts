import { DEFAULT_SHIPMENT_STATUS } from '@/lib/constants/shipment-status';

import { ShipmentFormData } from '@/types/shipment-form';

export const shipmentFormDefaultValues: ShipmentFormData = {
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