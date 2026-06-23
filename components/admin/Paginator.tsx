import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
  search?: string;
}

export default function Paginator({ currentPage, totalPages, search }: Props) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (search) {
      params.set('search', search);
    }

    return `/admin?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <Link href={buildUrl(currentPage - 1)} className="rounded border px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
        Anterior
      </Link>

      <span>
        {currentPage} / {totalPages}
      </span>

      <Link href={buildUrl(currentPage + 1)} className="rounded border px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
        Siguiente
      </Link>
    </div>
  );
}
