import { ReactNode } from 'react';
import ShipmentContainer from './ShipmentContainer';

interface ShipmentPageProps {
  title: string;
  children: ReactNode;
}

export default function ShipmentPage({ title, children }: ShipmentPageProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <ShipmentContainer title={title}>
        {children}
      </ShipmentContainer>
    </main>
  );
}
