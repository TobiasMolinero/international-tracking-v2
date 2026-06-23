// components/admin/EnviosTable.tsx

import Link from 'next/link';
import { Shipment } from '@/types/tracking';

interface EnviosTableProps {
  shipments: Shipment[];
}

export default function EnviosTable({ shipments }: EnviosTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Nro. Venta</th>
            <th className="px-4 py-3 text-left">Fecha Venta</th>
            <th className="px-4 py-3 text-left">Estado</th>
            <th className="px-4 py-3 text-left">Fecha Envío</th>
            <th className="px-4 py-3 text-left">HBL</th>
            <th className="px-4 py-3 text-left">Guía/Contenedor</th>
            <th className="px-4 py-3 text-left">Consignatario</th>
            <th className="px-4 py-3 text-left">Nro. Identidad</th>
            <th className="px-4 py-3 text-left"></th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.nro_venta} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{shipment.nro_venta}</td>

              <td className="px-4 py-3">{shipment.fecha_venta}</td>

              <td className="px-4 py-3">{shipment.estado}</td>

              <td className="px-4 py-3">{shipment.fecha_envio ?? '-'}</td>

              <td className="px-4 py-3">{shipment.hbl ?? '-'}</td>

              <td className="px-4 py-3">{shipment.contenedor_guia ?? '-'}</td>

              <td className="px-4 py-3">{shipment.nombre_consignatario}</td>

              <td className="px-4 py-3">{shipment.carnet_identidad}</td>

              <td className="px-4 py-3">
                <Link
                  href={`/admin/${shipment.nro_venta}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}

          {shipments.length === 0 && (
            <tr>
              <td colSpan={9} className="py-6 text-center text-gray-500">
                No se encontraron envíos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
