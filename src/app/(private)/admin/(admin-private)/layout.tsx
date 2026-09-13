import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminPrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
        <AdminSidebar />

        <div className="pl-[250px]">
          <AdminTopbar />

          <main className="min-h-[calc(100vh-72px)] p-6">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
