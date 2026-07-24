import { ObjectId } from 'mongodb';

import clientPromise from '@/lib/mongodb';
import { calculateShipmentStatus } from '@/lib/shipment-status';

import { Shipment } from '@/types/tracking';

async function getCollection() {
  const client = await clientPromise;

  return client.db('argmotors-track').collection('envios');
}

/* ======================================
   FIND
====================================== */

export async function findShipmentById(id: string) {
  const collection = await getCollection();

  return collection.findOne({
    _id: new ObjectId(id),
  });
}

export async function findShipmentBySaleNumber(nroVenta: string) {
  const collection = await getCollection();

  return collection.findOne({
    nro_venta: nroVenta,
  });
}

/* ======================================
   LIST
====================================== */

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
            estado: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            hbl: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            contenedor_guia: {
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

  const totalDocuments = await collection.countDocuments(filter);

  const shipments = await collection
  .aggregate([
    {
      $match: filter,
    },
    {
      $addFields: {
        nroVentaNumber: {
          $toInt: {
            $arrayElemAt: [
              {
                $split: ['$nro_venta', '-'],
              },
              1,
            ],
          },
        },
      },
    },
    {
      $sort: {
        nroVentaNumber: -1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ])
  .toArray();

  return {
    shipments,
    totalPages: Math.ceil(totalDocuments / limit),
    totalDocuments,
  };
}

/* ======================================
   CREATE
====================================== */

export async function createShipment(shipment: Omit<Shipment, '_id'>) {
  const collection = await getCollection();

  return collection.insertOne(shipment);
}

/* ======================================
   UPDATE
====================================== */

export async function updateShipment(id: string, shipment: Partial<Omit<Shipment, '_id'>>) {
  const collection = await getCollection();

  return collection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: shipment,
    }
  );
}

/* ======================================
   DELETE
====================================== */

export async function deleteShipment(id: string) {
  const collection = await getCollection();

  return collection.deleteOne({
    _id: new ObjectId(id),
  });
}

export async function deleteShipments(ids: string[]) {
  const collection = await getCollection();

  return collection.deleteMany({
    _id: {
      $in: ids.map((id) => new ObjectId(id)),
    },
  });
}

/* ======================================
   MANUAL STATUS
====================================== */

export async function updateShipmentStatus(id: string, estado: string) {
  return updateShipment(id, {
    estado,
  });
}

export async function updateShipmentsStatus(ids: string[], estado: string) {
  const collection = await getCollection();

  return collection.updateMany(
    {
      _id: {
        $in: ids.map((id) => new ObjectId(id)),
      },
    },
    {
      $set: {
        estado,
      },
    }
  );
}

/* ======================================
   AUTO STATUS
====================================== */

export async function updateShipmentStatusBySaleDate(
  id: string,
  shipment: Pick<Shipment, 'fecha_venta' | 'hold'>
) {
  return updateShipment(id, {
    estado: calculateShipmentStatus(shipment),
  });
}

export async function updateShipmentsStatusBySaleDate(
  shipments: Pick<Shipment, '_id' | 'fecha_venta' | 'hold'>[]
) {
  const collection = await getCollection();

  const operations = shipments.map((shipment) => ({
    updateOne: {
      filter: {
        _id: new ObjectId(shipment._id),
      },
      update: {
        $set: {
          estado: calculateShipmentStatus(shipment),
        },
      },
    },
  }));

  return collection.bulkWrite(operations);
}
