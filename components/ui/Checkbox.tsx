'use client';

import * as React from 'react';
import clsx from 'clsx';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, disabled, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label
          className={clsx(
            'inline-flex items-center gap-2 text-sm font-medium text-gray-700',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={clsx(
              'h-4 w-4 rounded border-gray-300 text-blue-600',
              'focus:ring-2 focus:ring-blue-500',
              className
            )}
            {...props}
          />

          {label}
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';