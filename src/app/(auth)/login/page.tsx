import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, signupAllowed, userCount } from "@/lib/auth";
import { LoginForm } from "./form";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  const [open, users] = await Promise.all([signupAllowed(), userCount()]);

  return (
    <div className="animate-in">
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-contrast">
            S
          </div>
          <span className="text-sm font-semibold tracking-tight">SAT OS</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
          {users === 0
            ? "No account exists on this instance yet. Create one to begin."
            : "Your practice history, error log and study plan are stored privately in this instance."}
        </p>
      </div>

      <LoginForm />

      {open ? (
        <p className="mt-6 text-center text-xs text-text-muted">
          {users === 0 ? "First time here? " : "Need an account? "}
          <Link href="/signup" className="font-medium text-accent hover:underline">
            Create one
          </Link>
        </p>
      ) : null}
    </div>
  );
}
