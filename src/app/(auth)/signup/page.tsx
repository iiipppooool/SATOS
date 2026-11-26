import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, signupAllowed } from "@/lib/auth";
import { SignupForm } from "./form";
import { Notice } from "@/components/ui";

export const metadata = { title: "Create account" };

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  const open = await signupAllowed();

  return (
    <div className="animate-in">
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-contrast">
            S
          </div>
          <span className="text-sm font-semibold tracking-tight">SAT OS</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
          This instance is private. Once your account exists, signup closes automatically
          unless you set ALLOW_SIGNUP.
        </p>
      </div>

      {open ? (
        <SignupForm />
      ) : (
        <Notice tone="warning">
          Signup is closed because an account already exists on this instance. Sign in instead, or
          set ALLOW_SIGNUP=true in your environment to add another account.
        </Notice>
      )}

      <p className="mt-6 text-center text-xs text-text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
