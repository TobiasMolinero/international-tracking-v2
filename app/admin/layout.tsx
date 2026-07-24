import Header from "@/components/admin/Header";

export default function AdminLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      {modal}
    </>
  );
}