import { boolean, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 80 }),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "published",
  "archived",
]);

export const categoryEnum = pgEnum("category", [
  "Tax",
  "Accounting",
  "Business",
]);

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: categoryEnum("category").notNull(),
  coverImageUrl: text("cover_image_url"),

  status: postStatusEnum("status").default("draft").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  publishedAt: timestamp("published_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

