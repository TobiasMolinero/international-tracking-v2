'use client';

import { ReactNode } from 'react';

interface ShipmentContainerProps {
  title: string;
  children: ReactNode;
}

export default function ShipmentContainer({ title, children }: ShipmentContainerProps) {
  return (
    <div className="space-y-6">
      {/* <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </header> */}

      {children}
    </div>
  );
}
