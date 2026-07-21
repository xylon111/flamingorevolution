import { Link } from "@/i18n/navigation";

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">Sign-in failed</h1>
      <p className="text-muted-foreground">
        Something went wrong while signing you in. Please try again.
      </p>
      <Link href="/sign-in" className="underline">
        Back to sign in
      </Link>
    </main>
  );
}
