import HeaderBar from "@/components/HeaderBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-100 min-h-screen">
      <HeaderBar />
      <main className="p-6">{children}</main>
    </section>
  );
}
