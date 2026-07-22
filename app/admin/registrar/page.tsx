import ShipmentForm from '@/components/admin/shipment-form/ShipmentForm';
import ShipmentPage from '@/components/admin/shipment-form/ShipmentPage';

import { createShipmentAction } from '@/app/actions/admin/create-shipment.action';

export default function RegisterShipmentPage() {
  return (
    <ShipmentPage title="Registrar envío">
      <ShipmentForm action={createShipmentAction} />
    </ShipmentPage>
  );
}
