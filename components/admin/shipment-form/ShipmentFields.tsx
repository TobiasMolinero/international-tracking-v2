'use client';

import { UseFormReturn } from 'react-hook-form';

import { Input, Select, Checkbox } from '@/components/modul';

import { SHIPMENT_STATUSES } from '@/lib/constants/shipment-status';
import { ShipmentFormData } from '@/types/shipment-form';

interface ShipmentFieldsProps {
  form: UseFormReturn<ShipmentFormData>;
}

export default function ShipmentFields({ form }: ShipmentFieldsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Input
        label="Número de venta"
        error={errors.saleNumber?.message}
        {...register('saleNumber')}
      />

      <Input
        label="Fecha de venta"
        type="date"
        error={errors.saleDate?.message}
        {...register('saleDate')}
      />

      <Input
        label="Fecha de salida"
        type="date"
        error={errors.departureDate?.message}
        {...register('departureDate')}
      />

      <Select
        label="Estado del envío"
        options={SHIPMENT_STATUSES.map((status) => ({
          label: status,
          value: status,
        }))}
        error={errors.status?.message}
        {...register('status')}
      />

      <Input
        label="HBL"
        error={errors.hbl?.message}
        {...register('hbl')}
      />

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
        label="N° Carnet identidad"
        error={errors.consigneeIdentity?.message}
        {...register('consigneeIdentity')}
      />

      <Checkbox
        label="¿Poner en HOLD?"
        {...register('hold')}
      />
    </div>
  );
}