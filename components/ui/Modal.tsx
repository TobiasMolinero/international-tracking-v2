'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  preventClose?: boolean;
  onClose: () => void;
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
};

export function Modal({
  open,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  preventClose = false,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeOnEsc, onClose]);

  if (!open) {
    return null;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => {
          if (closeOnOverlayClick) {
            onClose();
          }
        }}
      />

      <div
        className={clsx(
          'relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-lg bg-white shadow-xl',
          sizes[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            {title ? (
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            ) : (
              <div />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {footer && (
          <div className="flex justify-end gap-2 border-t bg-gray-50 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  );
}

Modal.displayName = 'Modal';
