"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import {
  EXPLORE_COLORS,
  exploreTier,
  explorationPct,
} from "@/lib/gamification";
import { VISITED_COUNTRIES } from "@/lib/mock-data";

interface Tip {
  name: string;
  pct: number;
  x: number;
  y: number;
}

export function WorldMap() {
  const [tip, setTip] = useState<Tip | null>(null);

  const byName = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of VISITED_COUNTRIES) m.set(c.countryName, explorationPct(c));
    return m;
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-line bg-[var(--elevated)]">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[10, 25]} zoom={1}>
          <Geographies geography="/world-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const name: string = geo.properties.name;
                const pct = byName.get(name) ?? 0;
                const fill = EXPLORE_COLORS[exploreTier(pct)];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) =>
                      setTip({ name, pct, x: e.clientX, y: e.clientY })
                    }
                    onMouseMove={(e) =>
                      setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t))
                    }
                    onMouseLeave={() => setTip(null)}
                    style={{
                      default: {
                        fill,
                        stroke: "var(--canvas)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: pct > 0 ? fill : "#FF7A60",
                        stroke: "var(--canvas)",
                        strokeWidth: 0.75,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { fill, outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[130%] rounded-xl bg-ink px-2.5 py-1.5 text-xs font-medium text-[var(--canvas)] shadow-lift"
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.name}
          <span className="ml-1.5 text-brand-soft">
            {tip.pct > 0 ? `${tip.pct}% exploré` : "non visité"}
          </span>
        </div>
      )}
    </div>
  );
}
