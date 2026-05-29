# Insights Page：服务端筛选方案记录

## 背景

`app/(marketing)/insights/page.tsx` 目前因为分类筛选使用了 `useState` 和点击事件，所以整个 page 被标记为：

```tsx
"use client";
```

这会让整个 Insights 页面都成为 Client Component。虽然这不一定导致 SEO 完全失效，但对于未来从数据库读取 posts 的内容页来说，不是最优结构。

## 推荐目标

Insights 页面应该尽量保持为 Server Component：

```tsx
// app/(marketing)/insights/page.tsx
// 不写 "use client"
```

主要内容，包括：

- Hero
- Featured Post
- Post Cards
- Recent Posts
- Markdown 内容

都应该尽量在服务端渲染出来，让初始 HTML 中包含文章内容，利于 SEO 和首屏加载。

## 核心思路

分类筛选不要用前端 `useState` 处理，而是改成 URL query + 服务端查询。

例如：

```txt
/insights
/insights?category=Tax
/insights?category=Accounting
/insights?category=Business
```

用户点击分类时，不是在前端过滤已有数组，而是跳转到对应 URL。Next.js 的 page 根据 URL 中的 `category` 参数，在服务端查询数据库，返回已经过滤好的 posts。

## 推荐页面结构

```tsx
import HeroComponent from "@/app/components/main/HeroComponent";
import CatergoryFilter from "@/app/components/posts/CatergoryFilter";
import FeaturedPost from "@/app/components/posts/FeaturedPost";
import PostCard from "@/app/components/posts/PostCard";
import PostListItem from "@/app/components/posts/PostListItem";
import {
  getPostCategories,
  getPublishedPosts,
  getRecentPosts,
} from "@/lib/queries/posts";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "All" } = await searchParams;

  const [posts, categories, recentPosts] = await Promise.all([
    getPublishedPosts(category),
    getPostCategories(),
    getRecentPosts(),
  ]);

  const featuredPost = posts.find((post) => post.isFeatured);

  const insightsProps = {
    title: "Insights",
    description: "Stay updated with the latest news and insights from our team.",
    backgroundImageUrl: "insights.jpg",
  };

  return (
    <div>
      <HeroComponent heroInfo={insightsProps} />

      <section className="container py-10 flex flex-col bg-emerald-50 lg:flex-row gap-10">
        <main className="lg:w-3/4">
          <CatergoryFilter
            categories={["All", ...categories]}
            selectedCategory={category}
          />

          {featuredPost && category === "All" && (
            <div className="my-10 w-full">
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          <div className="my-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) =>
              post.isFeatured ? null : <PostCard key={post.id} post={post} />
            )}
          </div>
        </main>

        <aside className="container lg:w-1/4">
          <h2 className="text-xl mb-6">Recent Posts</h2>
          {recentPosts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </aside>
      </section>
    </div>
  );
}
```

## CategoryFilter 推荐改法

`CatergoryFilter` 当前使用 `onClick`，所以需要 `"use client"`。

如果改成 `Link`，它就可以变成 Server Component：

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CatergoryFilter({
  categories,
  selectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => {
        const href =
          category === "All"
            ? "/insights"
            : `/insights?category=${encodeURIComponent(category)}`;

        return (
          <div key={category} className="flex items-center">
            {index > 0 && (
              <Separator orientation="vertical" className="mx-2 h-full" />
            )}

            <Button
              asChild
              variant={selectedCategory === category ? "default" : "link"}
            >
              <Link href={href}>{category}</Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
```

## 数据库查询函数示例

可以新建：

```txt
lib/queries/posts.ts
```

示例：

```tsx
import { posts } from "@/db/schema";
import { db } from "@/lib/db";
import { and, desc, eq } from "drizzle-orm";

export async function getPublishedPosts(category = "All") {
  const conditions =
    category === "All"
      ? eq(posts.status, "published")
      : and(eq(posts.status, "published"), eq(posts.category, category));

  return db
    .select()
    .from(posts)
    .where(conditions)
    .orderBy(desc(posts.publishedAt));
}

export async function getRecentPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt))
    .limit(3);
}

export async function getPostCategories() {
  const rows = await db
    .selectDistinct({ category: posts.category })
    .from(posts)
    .where(eq(posts.status, "published"));

  return rows.map((row) => row.category);
}
```

## 为什么推荐服务端筛选

前端一次性拿所有 posts 再过滤，适合 demo 或极少量数据。

但正式的 Insights 内容页更推荐服务端筛选，因为：

- 初始 HTML 中包含真实文章内容，SEO 更好
- 数据库只返回当前分类需要的数据
- URL 可分享，例如 `/insights?category=Tax`
- 用户刷新页面后筛选状态不会丢失
- 以后增加分页、搜索、排序更自然
- 减少传给浏览器的数据量
- 减少 client JavaScript 和 hydration 成本

## `searchParams` 知识点

### 1. 什么是 `searchParams`

`searchParams` 是 Next.js App Router 中 page 可以接收的一个参数，用来读取 URL query string。

例如 URL：

```txt
/insights?category=Tax&page=2
```

其中：

```txt
category=Tax
page=2
```

就是 search params。

在 page 中可以这样读取：

```tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category = "All", page = "1" } = await searchParams;

  return <div>{category}</div>;
}
```

### 2. 为什么这里是 `Promise`

当前项目使用的是 Next.js 16。

在新版 App Router 中，`searchParams` 是一个 Promise，所以需要：

```tsx
const params = await searchParams;
```

或者直接解构：

```tsx
const { category = "All" } = await searchParams;
```

不要按照旧版本习惯直接写：

```tsx
// 不推荐 / 旧写法
const category = searchParams.category;
```

### 3. `searchParams` 通常用来做什么

适合用来表示页面状态，例如：

```txt
/insights?category=Tax
/products?page=2
/products?sort=price-asc
/search?q=accounting
```

常见用途：

- 分类筛选
- 搜索关键词
- 分页
- 排序
- tab 状态

### 4. 为什么 filter 适合放进 URL

如果分类状态只存在于 `useState` 中：

```tsx
const [selectedCategory, setSelectedCategory] = useState("All");
```

那么：

- 刷新页面后状态会丢失
- 无法分享当前筛选结果
- 搜索引擎不容易理解不同分类页
- 服务端无法直接根据分类查询数据库

如果分类状态放在 URL 中：

```txt
/insights?category=Tax
```

那么：

- 可以复制链接分享
- 刷新后状态仍然存在
- 服务端可以直接读取 category 并查询数据库
- 搜索引擎更容易抓取到对应内容

### 5. `params` 和 `searchParams` 的区别

#### `params`

用于动态路由路径的一部分。

例如文件：

```txt
app/insights/[slug]/page.tsx
```

访问：

```txt
/insights/my-first-post
```

这里的 `slug` 来自 `params`。

```tsx
const { slug } = await params;
```

#### `searchParams`

用于问号后面的 query string。

访问：

```txt
/insights?category=Tax
```

这里的 `category` 来自 `searchParams`。

```tsx
const { category } = await searchParams;
```

简单理解：

```txt
/insights/my-first-post?category=Tax
          ^^^^^^^^^^^^^  ^^^^^^^^^^^^
          params.slug    searchParams.category
```

## 最终建议

Insights 页面建议采用：

```txt
Server Page
  ├─ 通过 searchParams 读取 category
  ├─ 在服务端查询数据库 posts
  ├─ 服务端渲染文章内容
  ├─ CategoryFilter 使用 Link 改变 URL
  └─ 只有确实需要浏览器状态/事件的局部组件才使用 "use client"
```
