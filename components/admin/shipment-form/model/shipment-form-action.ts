import type { ActionState } from '@/types/action-state';

import { ShipmentFormData } from './shipment-form.schema';

export type ShipmentFormErrors = Partial<
  Record<keyof ShipmentFormData, string>
>;

export type ShipmentActionState = ActionState<
  undefined,
  ShipmentFormErrors
>;

export type ShipmentFormAction = (
  values: ShipmentFormData
) => Promise<ShipmentActionState>;