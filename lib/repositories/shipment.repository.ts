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

export async function getShipments(page: number, limit: number) {
  const collection = await getCollection();

  return collection
    .find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
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
