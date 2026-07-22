import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { EventFilters } from "@/features/events";

type Option = { slug: string; name_sq: string; name_en: string };

function buildQuery(current: EventFilters, key: string, value?: string) {
  const next = { ...current, [key]: value };
  const params = new URLSearchParams();
  if (next.city) params.set("city", next.city);
  if (next.category) params.set("category", next.category);
  if (next.tag) params.set("tag", next.tag);
  const qs = params.toString();
  return qs ? `/timeline?${qs}` : "/timeline";
}

export async function TimelineFilters({
  cities,
  categories,
  active,
}: {
  cities: Option[];
  categories: Option[];
  active: EventFilters;
}) {
  const locale = await getLocale();
  const label = (o: Option) => (locale === "sq" ? o.name_sq : o.name_en);

  const pill = (href: string, text: string, isActive: boolean) => (
    <Link
      key={href + text}
      href={href}
      className={
        isActive
          ? "rounded-full bg-nature px-3 py-1 text-sm text-nature-foreground"
          : "rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/70"
      }
    >
      {text}
    </Link>
  );

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap gap-2">
        {pill(
          buildQuery(active, "city", undefined),
          "All cities",
          !active.city,
        )}
        {cities.map((c) =>
          pill(
            buildQuery(active, "city", c.slug),
            label(c),
            active.city === c.slug,
          ),
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {pill(
          buildQuery(active, "category", undefined),
          "All categories",
          !active.category,
        )}
        {categories.map((c) =>
          pill(
            buildQuery(active, "category", c.slug),
            label(c),
            active.category === c.slug,
          ),
        )}
      </div>
    </div>
  );
}
