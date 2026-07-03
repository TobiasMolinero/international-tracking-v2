'use client';

import SearchBar from './SearchBar';
import EnviosTable from './EnviosTable';
import Paginator from './Paginator';
import { useMemo, useState } from 'react';

import type { Shipment, ShipmentId } from '@/types/tracking';

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

  const allSelected = useMemo(() => {
    return (
      shipments.length > 0 &&
      shipments.every((shipment) => selectedShipments.has(shipment._id))
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

  return (
    <>
      <SearchBar />
      <EnviosTable
        shipments={shipments}
        selectedShipments={selectedShipments}
        allSelected={allSelected}
        onToggleShipment={handleToggleShipment}
        onToggleAll={handleToggleAll}
      />
      <Paginator currentPage={currentPage} totalPages={totalPages} search={search} />
    </>
  );
}
