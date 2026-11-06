import type { MetadataRoute } from "next";
import { empresa } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${empresa.siteUrl}/sitemap.xml` };
}
