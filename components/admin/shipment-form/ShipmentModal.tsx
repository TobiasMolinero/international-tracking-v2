'use client';

import { useRouter } from 'next/navigation';

import { Modal } from '@/components/modul';

import ShipmentContainer from './ShipmentContainer';

interface ShipmentModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function ShipmentModal({ title, description, children }: ShipmentModalProps) {
  const router = useRouter();

  return (
    <Modal open size="lg" onClose={() => router.back()}>
      <ShipmentContainer title={title} description={description} closeAction={() => router.back()}>
        {children}
      </ShipmentContainer>
    </Modal>
  );
}
