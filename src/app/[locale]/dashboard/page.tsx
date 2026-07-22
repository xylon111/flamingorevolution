import { getCurrentProfile } from "@/features/auth";

export default async function DashboardHome() {
  const profile = await getCurrentProfile();

  return (
    <div className="space-y-4">
      <p>
        Welcome
        {profile?.display_name ? `, ${profile.display_name}` : ""} — you have{" "}
        <span className="font-semibold text-nature">{profile?.role}</span>{" "}
        access.
      </p>
      <p className="text-sm text-muted-foreground">
        The moderation queue and event tools will appear here as we build them.
      </p>
    </div>
  );
}
