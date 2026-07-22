"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import { env } from "@/shared/env";
import type { EventMapPoint } from "@/features/events";

export function EventMap({ points }: { points: EventMapPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const styleName = resolvedTheme === "dark" ? "dataviz-dark" : "dataviz";
    const styleUrl = `https://api.maptiler.com/maps/${styleName}/style.json?key=${env.NEXT_PUBLIC_MAPTILER_KEY}`;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: [19.9, 41.2], // roughly central Albania
      zoom: 6.5,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    for (const p of points) {
      const popup = new maplibregl.Popup({ offset: 24 }).setHTML(
        `<a href="/events/${p.slug}" style="font-weight:600">${p.title}</a>`,
      );
      new maplibregl.Marker({ color: "#e75a7c" })
        .setLngLat([p.lng, p.lat])
        .setPopup(popup)
        .addTo(map);
    }

    return () => map.remove();
  }, [points, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="h-[70vh] w-full overflow-hidden rounded-lg border border-border"
    />
  );
}
