import { db } from "@/lib/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function getAllServices() {
    const allServices = await db.select().from(services).where(eq(services.isActive, true));
    return allServices;
}

export async function getServiceBySlug(slug: string) {
    const service = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
    return service[0] || null;
}
