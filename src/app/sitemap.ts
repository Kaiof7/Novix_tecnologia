import type { MetadataRoute } from "next";
import { empresa } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacidade"].map((path) => ({ url: `${empresa.siteUrl}${path}` }));
}
