import { ShipmentFormData } from '@/components/admin/shipment-form/model';

import { ActionState } from './action-state';

export type ShipmentFormErrors = Record<keyof ShipmentFormData, string>;

export type ShipmentActionState = ActionState<undefined, ShipmentFormErrors>;

export type ShipmentFormAction = (values: ShipmentFormData) => Promise<ShipmentActionState>;
