'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ShipmentFields from './ShipmentFields';

import { Button } from '@/components/modul';

import {
  ShipmentFormAction,
  ShipmentFormData,
  // ShipmentFormErrors,
  shipmentFormDefaultValues,
  shipmentFormSchema,
} from './model';

interface ShipmentFormProps {
  action: ShipmentFormAction;
  defaultValues?: ShipmentFormData;
}

export default function ShipmentForm({
  action,
  defaultValues = shipmentFormDefaultValues,
}: ShipmentFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [serverError, setServerError] = useState<string>();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<ShipmentFormData>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (values: ShipmentFormData) => {
    setServerError(undefined);

    startTransition(async () => {
      const result = await action(values);

      if (!result.success) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            if (!message) return;

            setError(field as keyof ShipmentFormData, {
              type: 'server',
              message,
            });
          });
        }

        if (result.message) {
          setServerError(result.message);
        }

        return;
      }

      // router.back();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ShipmentFields register={register} control={control} errors={errors} />

      {serverError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancelar
        </Button>

        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
}
