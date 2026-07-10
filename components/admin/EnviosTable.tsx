import { Shipment, ShipmentId } from '@/types/tracking';
import { Button } from '../modul';
import { Edit } from 'lucide-react';

interface EnviosTableProps {
  shipments: Shipment[];
  selectedShipments: Set<ShipmentId>;
  allSelected: boolean;
  onToggleShipment: (shipmentId: ShipmentId) => void;
  onToggleAll: () => void;
  onEditShipment: (shipmentNumber: string) => void;
}

export default function EnviosTable({
  shipments,
  selectedShipments,
  allSelected,
  onToggleShipment,
  onToggleAll,
  onEditShipment,
}: EnviosTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                className="rounded h-5 w-5 cursor-pointer"
              />
            </th>
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
            <tr key={shipment._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedShipments.has(shipment._id)}
                  onChange={() => onToggleShipment(shipment._id)}
                  className="rounded h-5 w-5 cursor-pointer"
                />
              </td>

              <td className="px-4 py-3">{shipment.nro_venta}</td>

              <td className="px-4 py-3">{shipment.fecha_venta}</td>

              <td className="px-4 py-3">{shipment.estado}</td>

              <td className="px-4 py-3">{shipment.fecha_envio ?? '-'}</td>

              <td className="px-4 py-3">{shipment.hbl ?? '-'}</td>

              <td className="px-4 py-3">{shipment.contenedor_guia ?? '-'}</td>

              <td className="px-4 py-3">{shipment.nombre_consignatario}</td>

              <td className="px-4 py-3">{shipment.carnet_identidad}</td>

              <td className="px-4 py-3">
                <Button variant="primary" size="sm" onClick={() => onEditShipment(shipment._id)}>
                  <Edit className="h-4 w-4" />
                </Button>
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
