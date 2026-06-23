export default function SearchBar({ defaultValue }: { defaultValue?: string }) {
  return (
    <form className="flex w-[50%] gap-x-6 mb-4">
      <input
        type="text"
        name="search"
        defaultValue={defaultValue}
        placeholder="Buscar por venta, consignatario o documento..."
        className="grow rounded border px-3 py-2"
      />

      <input type="hidden" name="page" value="1" />

      <button
        type="submit"
        className="mt-2 rounded border px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
}
