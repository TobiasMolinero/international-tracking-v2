import { notFound } from 'next/navigation';

import ShipmentForm from '@/components/admin/shipment-form/ShipmentForm';
import ShipmentModal from '@/components/admin/shipment-form/ShipmentModal';

import { updateShipmentAction } from '@/app/actions/admin/update-shipment.action';

import { findShipmentBySaleNumber } from '@/lib/repositories/shipment.repository';

import { serializeShipment } from '@/lib/serializerShipment';

interface PageProps {
  params: Promise<{
    nro_venta: string;
  }>;
}

export default async function EditShipmentModalPage({ params }: PageProps) {
  const { nro_venta } = await params;

  const shipment = await findShipmentBySaleNumber(nro_venta);

  if (!shipment) {
    notFound();
  }

  const defaultValues = {
    ...serializeShipment(shipment),
    nro_venta: shipment.nro_venta.replace(/^v-/, ''),
  }

  return (
    <ShipmentModal title="Editar envío">
      <ShipmentForm action={updateShipmentAction} defaultValues={defaultValues} />
    </ShipmentModal>
  );
}
