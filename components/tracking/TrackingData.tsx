import { Shipment } from "@/types/tracking";
import { formatDate } from "@/lib/formatters";

export const TrackingData = ({shipmentData}: {shipmentData: Shipment}) => {
    return (
        <div className="flex flex-col gap-y-2 bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
            <h3 className="font-bold text-xl mb-2">Datos del Envío</h3>
            <div className="flex flex-col gap-y-1">
                <p><span className="font-bold">Número de Seguimiento:</span> {shipmentData.nro_venta}</p>
                <p><span className="font-bold">Fecha de envio:</span> {formatDate(shipmentData.fecha_envio)}</p>
                <p><span className="font-bold">Nombre consignatario:</span> {shipmentData.nombre_consignatario}</p>
                <p><span className="font-bold">Nro. Identidad:</span> {shipmentData.carnet_identidad}</p>
                <p><span className="font-bold">HBL:</span> {shipmentData.hbl}</p>
                <p><span className="font-bold">Guia:</span> {shipmentData.contenedor_guia}</p>
            </div>
        </div>
    );
}