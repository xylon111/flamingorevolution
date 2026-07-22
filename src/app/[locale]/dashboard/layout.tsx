import { currentUserIsModerator } from "@/features/auth";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isModerator = await currentUserIsModerator();
  const locale = await getLocale();

  if (!isModerator) {
    redirect({ href: "/", locale });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-flamingo">
          Moderator dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage submissions and events.
        </p>
      </div>
      {children}
    </div>
  );
}
