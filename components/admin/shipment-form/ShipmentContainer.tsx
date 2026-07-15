'use client';

import { X } from 'lucide-react';

interface ShipmentContainerProps {
  title: string;
  description?: string;
  closeAction?: () => void;
  children: React.ReactNode;
}

export default function ShipmentContainer({
  title,
  description = 'Complete la información del envío.',
  closeAction,
  children,
}: ShipmentContainerProps) {
  return (
    <div className="p-6">
      <header className="flex items-start justify-between border-b pb-4">
        {' '}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        {closeAction && (
          <button
            type="button"
            onClick={closeAction}
            className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        )}
      </header>

      <div className="mt-6">{children}</div>
    </div>
  );
}
