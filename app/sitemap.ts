import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.href,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
