import ShipmentContainer from './ShipmentContainer';

interface ShipmentPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function ShipmentPage({ title, description, children }: ShipmentPageProps) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <ShipmentContainer title={title} description={description}>
        {children}
      </ShipmentContainer>
    </main>
  );
}
