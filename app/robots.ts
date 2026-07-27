import type { MetadataRoute } from "next";
import { isPublicDeployment, siteUrl } from "@/app/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPublicDeployment ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  };
}
