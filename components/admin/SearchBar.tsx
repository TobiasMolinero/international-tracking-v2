import Link from "next/link";

export default function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const isSearching: boolean = defaultValue !== undefined && defaultValue.trim() !== '';

  return (
    <form className="flex w-[50%] gap-x-6 mb-4">
      <input
        type="text"
        name="search"
        defaultValue={defaultValue}
        placeholder="Buscar por Nro. de venta, estado, consignatario, HBL, contenedor o CI"
        className="grow rounded border px-3 py-2"
      />

      <input type="hidden" name="page" value="1" />

      <div className="flex gap-x-2">
        <button
          type="submit"
          className="rounded border px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
        >
          Buscar
        </button>

        {isSearching && (
          <Link href="/admin" className="rounded border px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
            Limpiar búsqueda
          </Link>
        )}
      </div>
    </form>
  );
}
