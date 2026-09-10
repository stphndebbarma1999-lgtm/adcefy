import type { Metadata } from "next";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Create Account",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-bold text-ink">Create your account</h1>
        <p className="mb-6 text-sm text-muted">Join ADCEFY to track orders and check out faster.</p>
        <form className="flex flex-col gap-4">
          <Input label="Full Name" name="name" placeholder="Your name" required />
          <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
          <Input label="Phone" type="tel" name="phone" placeholder="98765 43210" required />
          <Input label="Password" type="password" name="password" placeholder="••••••••" required />
          <Button type="submit" fullWidth>
            Create Account
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
        <p className="mt-6 text-center text-xs text-muted">
          Account authentication is not yet connected to a live backend in this build.
        </p>
      </div>
    </div>
  );
}
