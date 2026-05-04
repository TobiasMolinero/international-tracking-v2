'use client';

import { useActionState } from 'react';
import { searchTracking } from './tracking/actions';
import { TrackingForm } from '@/components/tracking/TrackingForm';
import TrackingStepper from '@/components/tracking/TrackingStepper';
import { mapEstadoToStep } from '@/lib/trackingStatusMapper';

export default function Home() {
  const [state, formAction, pending] = useActionState(searchTracking, null);

  return (
    <main className="flex flex-col flex-1 items-center mt-15 overflow-y-auto">
      <div className="flex flex-col items-center gap-y-6 w-full">
        <h2 className="font-bold text-lg">Ingresa tu número de seguimiento</h2>
        <TrackingForm formAction={formAction} pending={pending} />

        {state?.shipment && <TrackingStepper estado={mapEstadoToStep(state.shipment.estado)} />}

        {state?.error && <p className="text-red-500">¡Ocurrió un error al buscar los datos del envio! Si el problema persiste pongase en contacto con nosotros.</p>}
      </div>
    </main>
  );
}
