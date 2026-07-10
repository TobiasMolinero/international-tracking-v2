import { ShipmentFormData } from "@/types/shipment-form";
import { ShipmentPage, ShipmentForm } from '@/components/admin/shipment-form/index';

const handleSubmit = async (
    values: ShipmentFormData
) => {

    await createShipment(values);

    redirect('/admin');
};

return (
    <ShipmentPage title="Registrar envío">

        <ShipmentForm
            submitLabel="Registrar envío"
            onSubmit={handleSubmit}
        />

    </ShipmentPage>
);