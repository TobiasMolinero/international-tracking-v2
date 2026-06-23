// app/admin/page.tsx

import EnviosTable from '@/components/admin/EnviosTable';
import Paginator from '@/components/admin/Paginator';

import { getShipmentsForAdmin } from '@/app/actions/admin.actions';
import SearchBar from '@/components/admin/SearchBar';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const search = params.search ?? '';

  const result = await getShipmentsForAdmin({
    page,
    limit: 20,
    search,
  });

  return (
    <main className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Administración de envíos</h1>

      <SearchBar defaultValue={search} />

      <EnviosTable shipments={result.shipments} />

      <Paginator currentPage={page} totalPages={result.totalPages} />
    </main>
  );
}
