import { Shipment, ShipmentId } from '@/types/tracking';
import { Button } from '../modul';
import { Edit, RefreshCw, Trash2 } from 'lucide-react';

interface EnviosTableProps {
  shipments: Shipment[];
  selectedShipments: Set<ShipmentId>;
  allSelected: boolean;
  onToggleShipment: (shipmentId: ShipmentId) => void;
  onToggleAll: () => void;
  onEditShipment: (shipmentNumber: string) => void;
  onUpdateShipmentStatus: (shipmentNumber: Shipment) => void;
  onDeleteShipment: (shipmentNumber: Shipment) => void;
}

function calculateDaysSinceUpdate(updatedStatusDate: string): string {
  const updatedDate = new Date(updatedStatusDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - updatedDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return typeof daysDifference === 'number' && !isNaN(daysDifference)
    ? daysDifference.toString()
    : '-';
}

export default function EnviosTable({
  shipments,
  selectedShipments,
  allSelected,
  onToggleShipment,
  onToggleAll,
  onEditShipment,
  onUpdateShipmentStatus,
  onDeleteShipment,
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
            <th className="px-4 py-3 text-left">Recibe</th>
            <th className="px-4 py-3 text-left">Reanudación</th>
            <th className="px-4 py-3 text-left">Seguimiento</th>
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

              <td className="px-4 py-3">
                {shipment.nombre_consignatario} · {shipment.carnet_identidad}
              </td>

              <td className="px-4 py-3">
                {shipment.reanudado ? 'SI' : 'NO'} · {shipment.fecha_reanudacion}
              </td>

              <td className="px-4 py-3">
                {shipment.updated_status_date.substring(0, 10)} ·{' '}
                {calculateDaysSinceUpdate(shipment.updated_status_date)}
              </td>

              <td className="px-4 py-3 flex gap-x-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEditShipment(shipment.nro_venta)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onUpdateShipmentStatus(shipment)}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="danger" size="sm" onClick={() => onDeleteShipment(shipment)}>
                  <Trash2 className="h-4 w-4" />
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
