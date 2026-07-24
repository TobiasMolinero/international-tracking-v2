import ShipmentForm from '@/components/admin/shipment-form/ShipmentForm';
import ShipmentModal from '@/components/admin/shipment-form/ShipmentModal';

import { createShipmentAction } from '@/app/actions/admin/create-shipment.action';

export default function RegisterShipmentModalPage() {
  return (
    <ShipmentModal title="Registrar envío">
      <ShipmentForm action={createShipmentAction} />
    </ShipmentModal>
  );
}
