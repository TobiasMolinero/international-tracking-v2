import { Button } from '../modul';
import { RefreshCw, Trash2, PlusCircle } from 'lucide-react';

interface ToolBarProps {
  selectedCount: number;
  isLoading: boolean;
  bulkAction: 'update' | 'delete' | null;
  onUpdateSelected: () => void;
  onDeleteSelected: () => void;
}

export default function ToolBar({
  selectedCount,
  isLoading,
  bulkAction,
  onUpdateSelected,
  onDeleteSelected,
}: ToolBarProps) {
  const disabled = selectedCount === 0 || isLoading;

  return (
    <div className="flex flex-col gap-2 justify-start">
      <span className="text-sm">
        {selectedCount} elemento{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
      </span>
      <div className="flex gap-2">
        <Button          
          variant="primary"
          size="md"
          className="flex items-center gap-2"
          onClick={() => console.log('crear envio')}
          disabled={isLoading}
        >
          <PlusCircle />
          Crear envío
        </Button>
        <Button
          variant="primary"
          size="md"
          className="flex items-center gap-2"
          onClick={onUpdateSelected}
          disabled={disabled}
        >
          <RefreshCw />
          {bulkAction === 'update' ? 'Actualizando envíos...' : 'Actualizar seleccionados'}
        </Button>
        <Button
          variant="danger"
          size="md"
          className="flex items-center gap-2"
          onClick={onDeleteSelected}
          disabled={disabled}
        >
          <Trash2 />
          {bulkAction === 'delete' ? 'Eliminando envíos...' : 'Eliminar seleccionados'}
        </Button>
      </div>
    </div>
  );
}
