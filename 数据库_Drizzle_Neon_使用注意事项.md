# 数据库 Drizzle + Neon 使用注意事项

本项目数据库方案：

```txt
Next.js 16 + Neon Serverless Postgres + Drizzle ORM + Drizzle Kit
```

当前数据库主要文件：

```txt
db/schema.ts              数据库表结构定义
db/migrations/           Drizzle migration SQL 文件
lib/db.ts                 服务端数据库连接
drizzle.config.ts         Drizzle Kit 配置
.env.local                本地数据库连接字符串，不提交 Git
```

---

## 1. 环境变量

本地使用 `.env.local`：

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB_NAME?sslmode=require"
```

生产环境，例如 Vercel，需要在平台的 Environment Variables 里配置：

```txt
DATABASE_URL
```

注意：

```txt
.env.local 不要提交到 Git。
```

---

## 2. Drizzle 配置

配置文件：

```txt
drizzle.config.ts
```

当前配置：

```ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

为什么需要 `dotenv`：

```txt
Next.js 运行时会自动读取 .env.local，
但 drizzle-kit 是独立 CLI，不属于 Next.js，
所以需要 dotenv 主动读取 .env.local。
```

---

## 3. 数据库连接

连接文件：

```txt
lib/db.ts
```

当前使用 Neon HTTP driver：

```ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
```

注意：

```txt
db 只能在服务端使用。
不要在 Client Component 中导入 db。
```

推荐使用位置：

```txt
Server Component
Server Action
Route Handler
服务端 query/helper 文件
```

不要这样：

```tsx
"use client";
import { db } from "@/lib/db";
```

---

## 4. package.json 数据库脚本

当前脚本：

```json
{
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:push": "drizzle-kit push",
  "db:studio": "drizzle-kit studio"
}
```

说明：

```txt
npm run db:generate  根据 db/schema.ts 生成 migration SQL 文件，不修改数据库
npm run db:migrate   执行 migration SQL，真正修改数据库
npm run db:push      直接把 schema 同步到数据库，不推荐生产使用
npm run db:studio    打开 Drizzle Studio 查看/管理数据库
```

---

## 5. 推荐工作流

### 开发/生产都推荐

```bash
npm run db:generate
npm run db:migrate
```

流程：

```txt
修改 db/schema.ts
        ↓
npm run db:generate
        ↓
检查 db/migrations/xxxx.sql
        ↓
确认 SQL 没有问题
        ↓
npm run db:migrate
        ↓
数据库真正变更
```

生成 migration 后重点检查：

```txt
表名是否正确
字段类型是否正确
not null / default / unique 是否正确
有没有意外的 DROP TABLE / DROP COLUMN
enum / foreign key 是否符合预期
```

---

## 6. db:generate / db:migrate / db:push 区别

### db:generate

```txt
schema.ts → migration SQL 文件
```

只生成 SQL 文件，不改数据库。

### db:migrate

```txt
migration SQL 文件 → 数据库
```

真正执行 migration，并写入 migration history。

### db:push

```txt
schema.ts → 数据库
```

直接同步数据库结构，不走 migration 文件流程。

`db:push` 适合早期快速试验，但不推荐生产使用。

---

## 7. 这次踩过的坑：push 后再 migrate

这次项目里出现的问题：

```txt
Neon 里已经有 services 表，
但 drizzle.__drizzle_migrations 记录是空的。
```

原因大概率是之前使用了：

```bash
npm run db:push
```

`db:push` 会直接创建/修改表，但不会按 migration 文件维护完整的 migration history。

后来运行：

```bash
npm run db:migrate
```

Drizzle 会查看：

```txt
drizzle.__drizzle_migrations
```

如果记录为空，它会以为：

```txt
0000 没执行
0001 没执行
0002 没执行
```

于是从第一个 migration 开始执行，例如重新执行：

```sql
CREATE TABLE services (...)
```

但 Neon 中 `services` 表已经存在，所以 migrate 失败。

---

## 8. 这次如何修复：baseline migration history

由于数据库中 `services` 表已经存在，并且结构已经对应旧 migration：

```txt
0000_clear_praxagora.sql
0001_narrow_champions.sql
```

所以不应该重新执行旧 migration，而是要补 migration history。

Drizzle 的 migration 记录表：

```txt
drizzle.__drizzle_migrations
```

字段大概是：

```txt
id
hash
created_at
```

修复思路：

```txt
1. 确认现有数据库结构已经包含旧 migration 的变更
2. 读取 db/migrations/meta/_journal.json 中旧 migration 的 when 时间戳
3. 读取对应 .sql 文件内容
4. 用 SHA256 计算 migration SQL hash
5. 插入 drizzle.__drizzle_migrations
6. 再运行 npm run db:migrate
```

补完后，Drizzle 会认为：

```txt
0000 已执行
0001 已执行
```

然后只执行新的：

```txt
0002 创建 posts + post_status enum
```

重要：

```txt
只有在你明确知道数据库结构和 migration 文件一致时，才可以做 baseline。
不要随便手动改 drizzle.__drizzle_migrations。
```

---

## 9. 以后避免这个坑

从现在开始尽量统一使用：

```bash
npm run db:generate
npm run db:migrate
```

不要在同一个数据库上混用：

```bash
npm run db:push
```

尤其是生产环境不要用 `db:push`。

推荐原则：

```txt
本地快速试验、可以重置的数据库：可以 db:push
正式开发数据库：generate + migrate
生产数据库：只用 migrate
```

---

## 10. 当前 posts 表设计

当前 `posts` 表用于 Insights 文章。

字段包括：

```txt
id
title
slug
content
excerpt
category
cover_image_url
status
is_featured
published_at
created_at
updated_at
```

当前 category 先用字符串 slug：

```txt
tax
entity-setup
ato-updates
services
```

原因：

```txt
category 将来可能迁移成 categories 表。
现在先存稳定 slug，未来方便迁移。
```

---

## 11. Post status enum

`posts.status` 使用 Postgres enum。

Drizzle schema：

```ts
export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "published",
  "archived",
]);

export const posts = pgTable("posts", {
  status: postStatusEnum("status").default("draft").notNull(),
});
```

生成 SQL 类似：

```sql
CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'archived');

"status" "post_status" DEFAULT 'draft' NOT NULL
```

适合 enum 的字段：

```txt
status: draft / published / archived
role: admin / editor / viewer
```

不太适合 enum 的字段：

```txt
category
tag
```

原因：category/tag 将来可能新增、改名、排序、SEO、启用/停用，更适合独立表。

---

## 12. 将来 category / tag 扩展思路

当前：

```txt
posts.category = "tax"
```

将来扩展 categories 表：

```txt
categories
- id
- name
- slug
- description
- sortOrder
- isActive
- createdAt
- updatedAt
```

posts 新增：

```txt
category_id
```

迁移逻辑：

```sql
UPDATE posts
SET category_id = categories.id
FROM categories
WHERE posts.category = categories.slug;
```

确认无误后，再删除旧字段：

```sql
ALTER TABLE posts DROP COLUMN category;
```

Tags 是多对多，未来结构：

```txt
tags
- id
- name
- slug

post_tags
- post_id
- tag_id
```

---

## 13. Neon / migrate warning

执行 `npm run db:migrate` 时可能出现：

```txt
Warning '@neondatabase/serverless' can only connect to remote Neon/Vercel Postgres/Supabase instances through a websocket
```

这个是 warning，不一定是错误。

如果使用的是 Neon 远程数据库，通常可以忽略。

真正成功时会看到：

```txt
[✓] migrations applied successfully!
```

如果只看到 warning 后失败，需要检查：

```txt
DATABASE_URL 是否正确
Neon 数据库是否可连接
是否使用了正确 branch/database
migration 是否重复创建已有表
```

---

## 14. 常用检查 SQL

查看 public 下业务表：

```sql
select table_schema, table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
```

查看 Drizzle migration 记录：

```sql
select *
from drizzle.__drizzle_migrations
order by created_at;
```

查看 posts 字段：

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'posts'
order by ordinal_position;
```

查看 enum：

```sql
select n.nspname as schema, t.typname as name
from pg_type t
join pg_namespace n on n.oid = t.typnamespace
where n.nspname = 'public'
order by name;
```

---

## 15. 最重要的原则

```txt
1. 生产环境不要用 db:push
2. schema 改完先 generate
3. 检查 migration SQL
4. 再 migrate
5. 不要随便删除/修改已经执行过的 migration 文件
6. 不要随便手动改 drizzle.__drizzle_migrations
7. 如果从 push 切换到 migrate，需要做一次 baseline
```
