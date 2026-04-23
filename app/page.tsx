import { TrackingForm } from "@/components/tracking/TrackingForm";
import TrackingStepper from "@/components/tracking/TrackingStepper";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center mt-15 overflow-y-auto">
      <div className="flex flex-col items-center gap-y-6 w-full">
        <h2 className="font-bold text-lg">Ingresa tu número de seguimiento</h2>
        <TrackingForm />
        <TrackingStepper estado="CARGADO" />
      </div>
    </main>
  );
}
