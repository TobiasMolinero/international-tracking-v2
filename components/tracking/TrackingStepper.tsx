import Image from 'next/image';
import { steps, getCurrentStepIndex } from '@/lib/tracking';

export default function TrackingStepper({ estado }: { estado: string }) {
  const currentStepIndex = getCurrentStepIndex(estado);

  return (
    <div className="w-full py-10">
      <div className="relative grid grid-cols-[1fr_60px_1fr] gap-y-16">
        {/* Línea vertical */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-300" />

        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;

          return (
            <div key={step.id} className="contents">
              {/* LEFT */}
              <div className="pr-6 text-right">
                {step.side === 'left' && (
                  <div className={isCompleted ? 'opacity-100' : 'opacity-30'}>
                    <h3 className="text-blue-900 font-semibold tracking-wide">{step.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{step.description}</p>
                  </div>
                )}
              </div>

              {/* CENTER (icono + fecha) */}
              <div className={`flex flex-col items-center ${isCompleted ? 'opacity-100' : 'opacity-30'}`}>
                <div className="bg-blue-50 border border-blue-200 z-10 rounded-full p-2">
                  <Image src={step.icon} alt="icono" width={50} height={50}/>
                </div>
              </div>

              {/* RIGHT */}
              <div className="pl-6">
                {step.side === 'right' && (
                  <div className={isCompleted ? 'opacity-100' : 'opacity-30'}>
                    <h3 className="text-blue-900 font-semibold tracking-wide">{step.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{step.description}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
