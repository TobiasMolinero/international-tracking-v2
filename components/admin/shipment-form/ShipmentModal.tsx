import { Modal } from '@/components/modul';
import { useRouter } from 'next/navigation';

interface ShipmentModalProps {
    title: string;
    children: React.ReactNode;
}

export default function ShipmentModal({
    title,
    children,
}: ShipmentModalProps) {
    const router = useRouter();

    return (
        <Modal
            open
            title={title}
            onClose={() => router.back()}
        >
            {children}
        </Modal>
    );
}