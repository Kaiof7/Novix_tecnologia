import type { MetadataRoute } from "next";
import { empresa } from "@/lib/config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: empresa.nome,
    short_name: "Novix",
    description: empresa.fraseApoio,
    start_url: "/",
    display: "standalone",
    background_color: "#111318",
    theme_color: "#111318",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
