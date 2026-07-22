'use client';

import SearchBar from './SearchBar';
import EnviosTable from './EnviosTable';
import Paginator from './Paginator';
import ToolBar from './ToolBar';
import { useMemo, useState } from 'react';

import type { Shipment, ShipmentId, BulkAction } from '@/types/tracking';
import { useRouter } from 'next/navigation';
import { updateShipmentStatusAction } from '@/app/actions/admin/update-shipment-status.action';
import { deleteShipmentAction } from '@/app/actions/admin/delete-shipment.action';

interface AdminContentProps {
  shipments: Shipment[];
  currentPage: number;
  totalPages: number;
  search: string;
}

export default function AdminContent({
  shipments,
  currentPage,
  totalPages,
  search,
}: AdminContentProps) {
  const [selectedShipments, setSelectedShipments] = useState<Set<ShipmentId>>(new Set());
  const [bulkAction, setBulkAction] = useState<BulkAction>(null);

  const router = useRouter();

  const allSelected = useMemo(() => {
    return (
      shipments.length > 0 && shipments.every((shipment) => selectedShipments.has(shipment._id))
    );
  }, [shipments, selectedShipments]);

  const handleToggleShipment = (shipmentId: ShipmentId) => {
    setSelectedShipments((prev) => {
      const next = new Set(prev);

      if (next.has(shipmentId)) {
        next.delete(shipmentId);
      } else {
        next.add(shipmentId);
      }

      return next;
    });
  };

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedShipments(new Set());
      return;
    }

    setSelectedShipments(new Set(shipments.map((shipment) => shipment._id)));
  };

  const handleUpdateSelected = () => {
    console.log('Actualizando envíos...');
    setBulkAction('update');
    setTimeout(() => {
      console.log('Actualización de envíos completada.');
      setBulkAction(null);
      setSelectedShipments(new Set());
    }, 3000);
  };

  const handleDeleteSelected = () => {
    console.log('Eliminando envíos...');
    setBulkAction('delete');
    setTimeout(() => {
      console.log('Eliminación de envíos completada.');
      setBulkAction(null);
      setSelectedShipments(new Set());
    }, 3000);
  };

  const handleCreateShipment = () => {
    router.push('/admin/registrar');
  };

  const handleEditShipment = (shipmentNumber: string) => {
    router.push(`/admin/editar/${shipmentNumber}`);
  };

  const handleUpdateShipmentStatus = async (shipment: Shipment) => {
    const result = await updateShipmentStatusAction({
      id: shipment._id,
      fecha_venta: shipment.fecha_venta,
      hold: shipment.hold,
    });

    if (!result.success) {
      alert(result.message);
    }
  };

  const handleDeleteShipment = async (shipment: Shipment) => {
    if (!confirm(`¿Eliminar el envío ${shipment.nro_venta}?`)) {
      return;
    }

    const result = await deleteShipmentAction(shipment._id);

    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <>
      <SearchBar />
      <ToolBar
        selectedCount={selectedShipments.size}
        isLoading={bulkAction !== null}
        bulkAction={bulkAction}
        onCreateShipment={handleCreateShipment}
        onUpdateSelected={handleUpdateSelected}
        onDeleteSelected={handleDeleteSelected}
      />
      <EnviosTable
        shipments={shipments}
        selectedShipments={selectedShipments}
        allSelected={allSelected}
        onToggleShipment={handleToggleShipment}
        onToggleAll={handleToggleAll}
        onEditShipment={handleEditShipment}
        onUpdateShipmentStatus={handleUpdateShipmentStatus}
        onDeleteShipment={handleDeleteShipment}
      />
      <Paginator currentPage={currentPage} totalPages={totalPages} search={search} />
    </>
  );
}
