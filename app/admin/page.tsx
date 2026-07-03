import { getShipmentsForAdmin } from '@/app/actions/admin.actions';
import AdminContent from '@/components/admin/AdminContent';

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

  // console.log(result.shipments);

  return (
    <main className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Administración de envíos</h1>

      <AdminContent
        shipments={result.shipments}
        currentPage={page}
        totalPages={result.totalPages}
        search={search}
      />
    </main>
  );
}
