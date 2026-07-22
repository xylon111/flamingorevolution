import { getTranslations } from "next-intl/server";

type Level = "high" | "medium" | "low";

function levelFor(confidence: number | null): Level | null {
  if (confidence === null) return null;
  if (confidence >= 0.75) return "high";
  if (confidence >= 0.5) return "medium";
  return "low";
}

const styles: Record<Level, string> = {
  high: "bg-nature/15 text-nature",
  medium: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  low: "bg-muted text-muted-foreground",
};

export async function ConfidenceBadge({
  confidence,
}: {
  confidence: number | null;
}) {
  const level = levelFor(confidence);
  if (!level) return null;

  const t = await getTranslations("confidence");

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[level]}`}
      title={t("label")}
    >
      {t(level)}
    </span>
  );
}
