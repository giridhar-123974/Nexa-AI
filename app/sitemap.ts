import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/#overview", "/#dashboard", "/#features", "/#how-it-works", "/#pricing", "/#faq"].map(
    (route) => ({
      url: `${SITE_CONFIG.url}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  return routes;
}
