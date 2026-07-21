import Link from "next/link";
import { getCurrentUser, signOut } from "@/features/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold">Flamingo Revolution</h1>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <Link href="/sign-in">
          <Button>Sign in</Button>
        </Link>
      )}
    </main>
  );
}
