interface ShipmentPageProps {
    title: string;
    children: React.ReactNode;
}

export default function ShipmentPage({
    title,
    children,
}: ShipmentPageProps) {
    return (
        <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
            <h1 className="text-2xl font-bold">
                {title}
            </h1>

            {children}
        </main>
    );
}