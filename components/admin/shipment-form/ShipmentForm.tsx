'use client';

import { useEffect, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/modul';

import ShipmentFields from './ShipmentFields';
import { shipmentFormDefaultValues } from './model/shipment-form.default-values';
import { shipmentFormSchema, ShipmentFormData } from './model/shipment-form.schema';

import { ShipmentFormAction } from '@/app/actions/admin';

interface ShipmentFormProps {
  action: ShipmentFormAction;

  defaultValues?: Partial<ShipmentFormData>;

  submitLabel: string;

  submittingLabel: string;
}

export default function ShipmentForm({
  action,
  defaultValues,
  submitLabel,
  submittingLabel,
}: ShipmentFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ShipmentFormData>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      ...shipmentFormDefaultValues,
      ...defaultValues,
    },
  });

  useEffect(() => {
    form.reset({
      ...shipmentFormDefaultValues,
      ...defaultValues,
    });
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await action(values);

      if (!result.success) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            form.setError(field as keyof ShipmentFormData, {
              message,
            });
          });
        }

        return;
      }

      form.reset(shipmentFormDefaultValues);
    });
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ShipmentFields form={form} />

      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
