'use server';

import { serializeShipment } from '@/lib/serializerShipment';
import { getShipments } from '@/lib/repositories/shipment.repository';

export async function getShipmentsForAdmin({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const result = await getShipments({
    page,
    limit,
    search,
  });

  return {
    ...result,
    shipments: result.shipments.map(serializeShipment),
  };
}
