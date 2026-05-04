'use client';

import { Button, Input } from '@/components/modul';

export const TrackingForm = ({ formAction, pending }: any) => {
  return (
    <form action={formAction} className="flex flex-col gap-y-6 md:w-[50%] lg:w-[50%] w-full px-4">
      <div>
        <Input name="trackingNumber" leftIcon={'V-'} required />
      </div>
      <div className="grid place-items-center">
        <Button type="submit" disabled={pending} className="w-full sm:w-full md:w-[50%] lg:w-[50%]">
          {pending ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
    </form>
  );
};
