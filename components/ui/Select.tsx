'use client';

import * as React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      options,
      placeholder,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={clsx(
              'w-full appearance-none rounded-md border bg-white px-3 py-2 pr-10 text-sm outline-none transition',
              'focus:border-transparent focus:ring-2 focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';