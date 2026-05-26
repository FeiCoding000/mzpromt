# Insights 页面开发流程

> 目标：基于当前 `app/(marketing)/insights/page.tsx`，完成一个带 Featured 文章、文章卡片、右侧推荐列表、搜索/分类过滤、文章详情页的 Insights 模块。

## 当前状态

页面已有基础结构：

```txt
HeroComponent
└─ Insights 页面主体
   ├─ main
   │  ├─ filter by category
   │  ├─ FeaturedPost
   │  └─ PostCard 列表
   └─ aside
      └─ PostListItem 推荐列表
```

已有 posts 组件文件，但目前为空：

```txt
app/components/posts/ArticleHeader.tsx
app/components/posts/FeaturedPost.tsx
app/components/posts/MarkdownContent.tsx
app/components/posts/PostCard.tsx
app/components/posts/PostListItem.tsx
```

数据库里已经有 `posts` 表结构：

```txt
db/schema.ts
```

包含字段：`title`, `slug`, `content`, `excerpt`, `category`, `coverImageUrl`, `status`, `isFeatured`, `publishedAt` 等。

---

## 开发顺序

## 1. 先确认数据模型

确认 `db/schema.ts` 里的 `posts` 是否满足页面需求。

目前基本够用，建议暂时不要过度扩展。

必要字段：

```txt
title
slug
excerpt
content
category
coverImageUrl
status
isFeatured
publishedAt
```

暂时不急着加：

```txt
author
tags
readingTime
viewCount
```

等页面跑通后再加。

---

## 2. 准备测试文章数据

先插入几篇测试文章，至少需要：

```txt
1 篇 isFeatured = true 的文章
6-9 篇普通 published 文章
2-4 个 category，例如：Tax / Business / Entity / Compliance
```

目的：先让页面布局和过滤逻辑有真实数据可以测试。

---

## 3. 写 posts 查询函数

新建：

```txt
lib/queries/posts.ts
```

建议先实现这些函数：

```ts
getPublishedPosts(params?: {
  category?: string;
  search?: string;
})

getFeaturedPost()

getRecommendedPosts(limit?: number)

getPostCategories()

getPostBySlug(slug: string)
```

页面数据来源统一走这里，不要直接在组件里写数据库查询。

---

## 4. 定义前端 Post 展示类型

可以直接使用 Drizzle 的 `Post` 类型，也可以在 `lib/queries/posts.ts` 里返回精简字段。

列表页只需要：

```txt
id
slug
title
excerpt
category
coverImageUrl
publishedAt
isFeatured
```

详情页才需要：

```txt
content
```

---

## 5. 完成 posts 基础组件

按这个顺序写组件：

### 5.1 PostCard

路径：

```txt
app/components/posts/PostCard.tsx
```

用途：普通文章卡片。

接收：

```ts
post
```

显示：

```txt
cover image
category
published date
title
excerpt
read more
```

---

### 5.2 FeaturedPost

路径：

```txt
app/components/posts/FeaturedPost.tsx
```

用途：首页顶部精选文章。

接收：

```ts
post
```

注意：只有默认未过滤状态显示 FeaturedPost。

---

### 5.3 PostListItem

路径：

```txt
app/components/posts/PostListItem.tsx
```

用途：右侧推荐/最新文章列表。

接收：

```ts
post
```

显示要简洁：

```txt
category
title
published date
```

---

## 6. 做搜索和分类过滤组件

新建：

```txt
app/components/posts/PostFilters.tsx
```

推荐使用 URL query 来控制过滤状态：

```txt
/insights?category=Tax
/insights?search=irs
/insights?category=Tax&search=irs
```

分类按钮：

```txt
All / Tax / Business / Entity / Compliance
```

搜索框 placeholder：

```txt
Search insights...
```

注意：

```txt
All = 不传 category
search 为空 = 不传 search
```

---

## 7. 改造 insights 页面数据流

修改：

```txt
app/(marketing)/insights/page.tsx
```

页面负责：

```txt
读取 searchParams
调用 queries 获取数据
把数据传给组件
```

页面逻辑：

```ts
const hasActiveFilters = Boolean(category || search);
```

渲染规则：

```txt
没有过滤：
  显示 FeaturedPost
  显示全部 latest posts

有过滤：
  隐藏 FeaturedPost
  显示过滤结果标题
  显示过滤后的 posts
```

推荐布局：

```txt
HeroComponent

section
├─ main
│  ├─ PostFilters
│  ├─ FeaturedPost              // only when no filters
│  └─ PostCard grid
└─ aside
   ├─ Recommended / Latest
   └─ PostListItem list
```

---

## 8. 处理空状态

当没有匹配文章时，显示：

```txt
No articles found.
Try adjusting your search or category filter.
```

不要让页面空白。

---

## 9. 做文章详情页

新建动态页面：

```txt
app/(marketing)/insights/[slug]/page.tsx
```

详情页组件使用：

```txt
ArticleHeader
MarkdownContent
PostListItem 推荐文章
```

详情页数据：

```ts
getPostBySlug(slug)
getRecommendedPosts(3)
```

如果文章不存在：

```txt
notFound()
```

---

## 10. 完成详情页组件

### 10.1 ArticleHeader

路径：

```txt
app/components/posts/ArticleHeader.tsx
```

显示：

```txt
category
published date
title
excerpt
cover image
```

### 10.2 MarkdownContent

路径：

```txt
app/components/posts/MarkdownContent.tsx
```

先可以简单渲染纯文本/HTML 样式。

如果后续确认文章用 Markdown，再接 markdown parser。

---

## 11. 样式整理

当前页面里有一些临时 class：

```txt
border rounded-lg p-4
vh-50
container 嵌套 container
```

整理方向：

```txt
外层 section 使用 container
main/aside 不再重复 container
使用 grid 代替 flex 更稳定
```

推荐：

```txt
section: container py-12
layout: grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]
main: space-y-10
cards: grid gap-6 sm:grid-cols-2
aside: space-y-6
```

---

## 12. 最后再考虑增强功能

页面完成后再考虑：

```txt
tags
reading time
author
相关文章
分页
后台管理
SEO metadata
Open Graph 图片
```

不要一开始就做太多。

---

## 推荐任务清单

按顺序执行：

```txt
[ ] 1. 确认 posts schema 是否够用
[ ] 2. 准备测试文章数据
[ ] 3. 新建 lib/queries/posts.ts
[ ] 4. 完成 PostCard
[ ] 5. 完成 FeaturedPost
[ ] 6. 完成 PostListItem
[ ] 7. 新建 PostFilters
[ ] 8. 改造 insights/page.tsx 接真实数据
[ ] 9. 加空状态
[ ] 10. 新建 insights/[slug]/page.tsx
[ ] 11. 完成 ArticleHeader
[ ] 12. 完成 MarkdownContent
[ ] 13. 整理 responsive layout
[ ] 14. 检查 SEO / metadata
```

---

## 当前建议的最终页面结构

```txt
Insights Hero

Search + Category Filters

Featured Article      // only default state

Latest / Filtered Articles             Sidebar
┌───────────────┐                      ┌──────────────┐
│ PostCard      │                      │ Recommended  │
│ PostCard      │                      │ PostListItem │
│ PostCard      │                      │ PostListItem │
└───────────────┘                      └──────────────┘
```

结论：

```txt
先定数据查询，再写组件，再接页面，最后做详情页和增强功能。
```
