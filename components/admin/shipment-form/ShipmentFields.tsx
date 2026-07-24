'use client';

import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Checkbox, Input, Select } from '@/components/modul';

import { SHIPMENT_STATUSES } from '@/lib/constants/shipment-status';

import { ShipmentFormData } from './model';

interface ShipmentFieldsProps {
  register: UseFormRegister<ShipmentFormData>;
  control: Control<ShipmentFormData>;
  errors: FieldErrors<ShipmentFormData>;
}

export default function ShipmentFields({ register, control, errors }: ShipmentFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Input label="Número de venta" {...register('nro_venta')} error={errors.nro_venta?.message} />

      <Input
        type="date"
        label="Fecha de venta"
        {...register('fecha_venta')}
        error={errors.fecha_venta?.message}
      />

      <Input
        type="date"
        label="Fecha de salida"
        {...register('fecha_envio')}
        error={errors.fecha_envio?.message}
      />

      <Controller
        control={control}
        name="estado"
        render={({ field }) => (
          <Select
            label="Estado"
            value={field.value}
            onChange={field.onChange}
            options={SHIPMENT_STATUSES.map((status) => ({
              label: status,
              value: status,
            }))}
            error={errors.estado?.message}
          />
        )}
      />

      <Input label="HBL" {...register('hbl')} error={errors.hbl?.message} />

      <Input
        label="Guía / Contenedor"
        {...register('contenedor_guia')}
        error={errors.contenedor_guia?.message}
      />

      <Input
        label="Nombre consignatario"
        {...register('nombre_consignatario')}
        error={errors.nombre_consignatario?.message}
      />

      <Input
        label="N° Carnet de identidad"
        {...register('carnet_identidad')}
        error={errors.carnet_identidad?.message}
      />

      <Input
        label="Comentario"
        {...register('comentario')}
        error={errors.comentario?.message}
      />

      <Controller
        control={control}
        name="hold"
        render={({ field }) => (
          <Checkbox label="Poner en HOLD" checked={field.value} onChange={field.onChange} />
        )}
      />
    </div>
  );
}
