# Tailwind CSS 中 Grid 的使用注意事项

> 项目当前使用 Tailwind CSS v4。以下内容适用于日常编写 `grid` 布局时参考。

## 1. 开启 Grid 容器

使用 Grid 前必须先给父元素添加 `grid`：

```tsx
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

常用类：

- `grid`：启用 CSS Grid
- `inline-grid`：启用行内 Grid
- `grid-cols-*`：设置列数
- `grid-rows-*`：设置行数
- `gap-*` / `gap-x-*` / `gap-y-*`：设置间距

## 2. `grid-cols-*` 只定义列，不负责子元素宽度内容

```tsx
<div className="grid grid-cols-3 gap-4">
```

表示父容器被分成 3 列，子元素会按顺序放入网格。

注意：

- 子元素数量超过列数会自动换行。
- 子元素本身内容过宽时，可能撑破布局，需要配合 `min-w-0`、`overflow-hidden`、`truncate` 等。

```tsx
<div className="grid grid-cols-3 gap-4">
  <div className="min-w-0 truncate">很长很长的内容...</div>
</div>
```

## 3. 响应式布局要从小屏开始写

Tailwind 是移动优先：未加前缀的是默认样式，加前缀的是指定断点以上生效。

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

含义：

- 默认：1 列
- `sm` 及以上：2 列
- `lg` 及以上：4 列

不要只写大屏布局，否则移动端容易溢出。

## 4. `col-span-*` 不能超过当前列数

```tsx
<div className="grid grid-cols-4 gap-4">
  <div className="col-span-2">占 2 列</div>
</div>
```

注意：

- `col-span-2` 需要父级至少有 2 列。
- 响应式时要确认每个断点的列数是否足够。

错误示例：

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <div className="col-span-2">小屏下可能不符合预期</div>
</div>
```

推荐：

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <div className="col-span-1 md:col-span-2">内容</div>
</div>
```

## 5. `gap` 是网格间距，不是外边距

```tsx
<div className="grid grid-cols-3 gap-6">
```

`gap-6` 只控制网格子项之间的距离，不会给父容器外侧增加距离。

如果需要外侧留白，应额外使用：

```tsx
<div className="grid grid-cols-3 gap-6 p-6">
```

## 6. 不确定列数时使用任意值

常见自适应卡片布局：

```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
```

或：

```tsx
<div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
```

区别：

- `auto-fit`：会拉伸已有列填满空间。
- `auto-fill`：会保留可用的空列位置。

多数卡片列表优先使用 `auto-fit`。

## 7. 任意值中的空格要避免直接写空格

Tailwind 的任意值类名中不能直接写普通空格。

推荐：

```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
```

如果需要表达包含空格的 CSS 值，通常用下划线 `_` 代替空格。

示例：

```tsx
<div className="grid grid-cols-[200px_1fr]">
```

等价于：

```css
grid-template-columns: 200px 1fr;
```

## 8. Grid 子项溢出时优先检查 `min-width`

Grid/Flex 子项默认可能因为内容最小宽度导致溢出。

常见解决：

```tsx
<div className="grid grid-cols-2 gap-4">
  <div className="min-w-0 overflow-hidden">内容</div>
</div>
```

如果文本需要省略：

```tsx
<div className="min-w-0 truncate">很长的标题内容</div>
```

## 9. Grid 与 Flex 的选择

优先使用 Grid 的场景：

- 二维布局：同时关注行和列。
- 卡片列表、仪表盘、图片墙。
- 需要 `col-span` / `row-span`。

优先使用 Flex 的场景：

- 一维布局：只关注横向或纵向排列。
- 按钮组、导航栏、左右对齐。
- 内容尺寸由自身决定较多。

## 10. 常用示例

### 三列卡片

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

### 左侧固定，右侧自适应

```tsx
<div className="grid grid-cols-[240px_1fr] gap-6">
  <aside>侧边栏</aside>
  <main className="min-w-0">主内容</main>
</div>
```

### 主区域 + 侧栏响应式

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
  <main className="min-w-0">主内容</main>
  <aside>侧栏</aside>
</div>
```

### 不定数量卡片自适应

```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
  {items.map((item) => (
    <Card key={item.id} />
  ))}
</div>
```

## 11. 排查清单

Grid 布局异常时按顺序检查：

1. 父元素是否写了 `grid`。
2. 是否设置了正确的 `grid-cols-*`。
3. 响应式断点下列数是否符合预期。
4. `col-span-*` 是否超过当前列数。
5. 子元素是否因为内容过长撑开，需要 `min-w-0`。
6. 是否需要 `gap`、`p`、`m` 区分网格间距和外边距。
7. 任意值类名是否写法正确，例如 `grid-cols-[200px_1fr]`。
