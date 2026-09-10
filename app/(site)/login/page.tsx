import type { Metadata } from "next";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Login",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-bold text-ink">Welcome back</h1>
        <p className="mb-6 text-sm text-muted">Log in to view your orders, wishlist and saved addresses.</p>
        <form className="flex flex-col gap-4">
          <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" name="password" placeholder="••••••••" required />
          <Button type="submit" fullWidth>
            Log In
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </p>
        <p className="mt-6 text-center text-xs text-muted">
          Account authentication is not yet connected to a live backend in this build.
        </p>
      </div>
    </div>
  );
}
