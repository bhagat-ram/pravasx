import { FormEvent, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/lib/admin-auth";

export function AdminLoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginAdmin({ data: { username, password } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full rounded-[2rem] border bg-card p-7 shadow-elevated sm:p-9">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <ShieldCheck className="h-6 w-6" />
      </div>
      <h1 className="mt-5 font-display text-3xl font-extrabold">Admin sign in</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This area is restricted to authorized PravasX operators.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-bold">Username</span>
          <input
            autoComplete="username"
            className="mt-2 h-12 w-full rounded-xl border bg-background px-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Admin username"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            className="mt-2 h-12 w-full rounded-xl border bg-background px-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Admin password"
            required
          />
        </label>

        {error && (
          <div role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </div>
        )}

        <Button type="submit" variant="brand" className="h-12 w-full" disabled={loading}>
          <LockKeyhole className="h-4 w-4" />
          {loading ? "Signing in…" : "Sign in to dashboard"}
        </Button>
      </form>

      <div className="mt-6 rounded-2xl bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Local demo:</strong> use the credentials shown in the project README. For production, set the admin credentials and session secret through environment variables.
      </div>
    </section>
  );
}
