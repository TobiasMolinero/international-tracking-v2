'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import Modal from '@/components/ui/Modal';
import ShipmentContainer from './ShipmentContainer';

interface ShipmentModalProps {
  title: string;
  children: ReactNode;
}

export default function ShipmentModal({ title, children }: ShipmentModalProps) {
  const router = useRouter();

  return (
    <Modal open title={title} onClose={() => router.back()}>
      <ShipmentContainer title={title}>{children}</ShipmentContainer>
    </Modal>
  );
}
