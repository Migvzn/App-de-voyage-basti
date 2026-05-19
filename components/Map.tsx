"use client";

import { useEffect, useState } from "react";
import { MapPin, Globe } from "lucide-react";

interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
  type?: "destination" | "hotel" | "activity";
}

interface MapProps {
  pins?: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  route?: { lat: number; lng: number }[];
  className?: string;
}

// Lazily load mapbox
type MapboxMapComponent = React.ComponentType<{
  initialViewState: { longitude: number; latitude: number; zoom: number };
  style: React.CSSProperties;
  mapStyle: string;
  mapboxAccessToken: string;
  children?: React.ReactNode;
}>;

type MarkerComponent = React.ComponentType<{
  longitude: number;
  latitude: number;
  children?: React.ReactNode;
}>;

export default function Map({ pins = [], center, zoom = 10, className = "" }: MapProps) {
  const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [MapComp, setMapComp] = useState<MapboxMapComponent | null>(null);
  const [MarkerComp, setMarkerComp] = useState<MarkerComponent | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const defaultCenter = center || (pins.length > 0 ? { lat: pins[0].lat, lng: pins[0].lng } : { lat: 48.8566, lng: 2.3522 });

  useEffect(() => {
    if (!mapToken) return;
    import("react-map-gl/mapbox")
      .then((mod: { Map: MapboxMapComponent; Marker: MarkerComponent }) => {
        setMapComp(() => mod.Map);
        setMarkerComp(() => mod.Marker);
        setLoaded(true);
      })
      .catch(() => setError(true));
  }, [mapToken]);

  // Fallback when no token or error
  if (!mapToken || error) {
    return (
      <div
        className={`bg-[#111111] border border-[#222222] rounded-xl overflow-hidden flex flex-col items-center justify-center gap-4 ${className}`}
        style={{ minHeight: 300 }}
      >
        <Globe className="w-12 h-12 text-[#333333]" />
        <div className="text-center">
          <div className="text-sm font-medium text-[#888888]">Map Preview</div>
          <div className="text-xs text-[#555555] mt-1">
            Add NEXT_PUBLIC_MAPBOX_TOKEN to enable interactive maps
          </div>
        </div>
        {pins.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {pins.slice(0, 6).map((pin, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-[#222222] rounded-full text-xs text-[#888888]"
              >
                <MapPin className="w-3 h-3 text-indigo-400" />
                {pin.label || `Location ${i + 1}`}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!loaded || !MapComp || !MarkerComp) {
    return (
      <div
        className={`bg-[#111111] border border-[#222222] rounded-xl overflow-hidden flex items-center justify-center ${className}`}
        style={{ minHeight: 300 }}
      >
        <div className="text-sm text-[#555555]">Loading map...</div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden ${className}`} style={{ minHeight: 300 }}>
      <MapComp
        initialViewState={{
          longitude: defaultCenter.lng,
          latitude: defaultCenter.lat,
          zoom,
        }}
        style={{ width: "100%", height: "100%", minHeight: 300 }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={mapToken}
      >
        {pins.map((pin, i) => (
          <MarkerComp key={i} longitude={pin.lng} latitude={pin.lat}>
            <div className="flex flex-col items-center gap-1 cursor-pointer group relative">
              <div className="w-8 h-8 bg-indigo-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
          </MarkerComp>
        ))}
      </MapComp>
    </div>
  );
}
