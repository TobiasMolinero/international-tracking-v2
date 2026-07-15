'use client';

import { UseFormReturn } from 'react-hook-form';

import { Checkbox, Input, Select } from '@/components/modul';

import { SHIPMENT_STATUSES } from '@/lib/constants/shipment-status';

import { ShipmentFormData } from './model';

interface ShipmentFieldsProps {
  form: UseFormReturn<ShipmentFormData>;
}

export default function ShipmentFields({ form }: ShipmentFieldsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <input type="hidden" {...register('_id')} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Número de venta"
          error={errors.saleNumber?.message}
          {...register('saleNumber')}
        />

        <Input
          type="date"
          label="Fecha de venta"
          error={errors.saleDate?.message}
          {...register('saleDate')}
        />

        <Input
          type="date"
          label="Fecha de salida"
          error={errors.departureDate?.message}
          {...register('departureDate')}
        />

        <Select
          label="Estado"
          options={SHIPMENT_STATUSES.map((status) => ({
            label: status,
            value: status,
          }))}
          error={errors.status?.message}
          {...register('status')}
        />

        <Input label="HBL" error={errors.hbl?.message} {...register('hbl')} />

        <Input
          label="Guía / Contenedor"
          error={errors.guideContainer?.message}
          {...register('guideContainer')}
        />

        <Input
          label="Nombre consignatario"
          error={errors.consigneeName?.message}
          {...register('consigneeName')}
        />

        <Input
          label="N° Identidad"
          error={errors.consigneeIdentity?.message}
          {...register('consigneeIdentity')}
        />

        <div className="md:col-span-2">
          <Checkbox label="Poner envío en HOLD" {...register('hold')} />
        </div>
      </div>
    </>
  );
}
