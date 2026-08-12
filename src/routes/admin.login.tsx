import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "PravasX — Admin Login" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-sand px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center justify-center">
        <div className="w-full">
          <Link to="/" className="mb-5 inline-block text-sm font-bold text-accent">
            ← Back to PravasX
          </Link>
          <AdminLoginForm onSuccess={() => navigate({ to: "/admin" })} />
        </div>
      </div>
    </main>
  );
}
