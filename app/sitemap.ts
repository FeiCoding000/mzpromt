import { serviceDetails } from "@/lib/constants/service-details";
import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://accounts.managementzone.com.au").replace(/\/$/, "");

const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/business", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/entity", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/tax", changeFrequency: "monthly", priority: 0.8 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const serviceRoutes = serviceDetails.map((service) => ({
    path: service.href,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
