'use client';

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/modul';

import ShipmentFields from './ShipmentFields';

import { ShipmentFormData } from '@/types/shipment-form';
import { shipmentFormSchema } from './shipment-form.schema';
import { shipmentFormDefaultValues } from './shipment-form.default-values';

interface ShipmentFormProps {
  defaultValues?: Partial<ShipmentFormData>;
  submitLabel?: string;
  loading?: boolean;
  onSubmit: (values: ShipmentFormData) => void | Promise<void>;
}

export default function ShipmentForm({
  defaultValues,
  submitLabel = 'Guardar',
  loading = false,
  onSubmit,
}: ShipmentFormProps) {
  const form = useForm<ShipmentFormData>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      ...shipmentFormDefaultValues,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (!defaultValues) return;

    form.reset({
      ...shipmentFormDefaultValues,
      ...defaultValues,
    });
  }, [defaultValues, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <ShipmentFields form={form} />

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Guardando...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}