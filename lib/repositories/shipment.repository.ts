import clientPromise from '@/lib/mongodb';

async function getCollection() {
  const client = await clientPromise;
  const db = client.db('argmotors-track');

  return db.collection('envios');
}

export async function findShipmentBySaleNumber(nroVenta: string) {
  const collection = await getCollection();

  return collection.findOne({
    nro_venta: nroVenta,
  });
}

// lib/repositories/shipment.repository.ts

export async function getShipments({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const collection = await getCollection();

  const filter = search
    ? {
        $or: [
          {
            nro_venta: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            nombre_consignatario: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            carnet_identidad: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  const totalDocuments =
    await collection.countDocuments(filter);

  const shipments = await collection
    .find(filter)
    .sort({ fecha_venta: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return {
    shipments,
    totalPages: Math.ceil(
      totalDocuments / limit
    ),
    totalDocuments,
  };
}

export async function updateShipment(nroVenta: string, data: Record<string, unknown>) {
  const collection = await getCollection();

  return collection.updateOne(
    { nro_venta: nroVenta },
    {
      $set: data,
    }
  );
}
