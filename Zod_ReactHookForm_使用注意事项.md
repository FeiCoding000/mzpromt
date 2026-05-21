# Zod + React Hook Form 使用注意事项

本项目表单推荐组合：

```txt
shadcn/ui 基础组件 + react-hook-form + zod
```

---

## 1. 职责区分

### Zod

负责校验数据是否合法。

常用于：

- 表单输入校验
- API 请求体校验
- Server Action 入参校验
- 从 schema 推导 TypeScript 类型

### React Hook Form

负责管理表单状态。

常用于：

- 注册 input
- 获取表单值
- 处理提交
- 显示错误
- 控制表单重置、loading 状态等

---

## 2. Schema 放置位置

建议统一放在：

```txt
lib/validations/
```

例如：

```txt
lib/validations/client.ts
lib/validations/contact.ts
```

不要把 Zod schema 散落在页面组件里，避免后续 API、Server Action、表单重复写校验逻辑。

---

## 3. Zod v4 写法注意

本项目使用 Zod v4。

邮箱不要再写：

```ts
z.string().email()
```

这个写法已 deprecated。

推荐写：

```ts
z.email("邮箱格式不正确")
```

示例：

```ts
import { z } from "zod"

export const createClientSchema = z.object({
  name: z.string().min(1, "请输入名称"),
  email: z.email("邮箱格式不正确"),
  message: z.string().min(1, "请输入内容"),
})

export type CreateClientInput = z.infer<typeof createClientSchema>
```

常用写法：

```ts
z.string()
z.email()
z.url()
z.uuid()
z.number()
z.boolean()
z.array(z.string())
```

---

## 4. React Hook Form + Zod 基础用法

客户端组件里使用：

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createClientSchema, type CreateClientInput } from "@/lib/validations/client"

export function ClientForm() {
  const form = useForm<CreateClientInput>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: CreateClientInput) {
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("name")} placeholder="名称" />
      {form.formState.errors.name && (
        <p>{form.formState.errors.name.message}</p>
      )}

      <input {...form.register("email")} placeholder="邮箱" />
      {form.formState.errors.email && (
        <p>{form.formState.errors.email.message}</p>
      )}

      <textarea {...form.register("message")} placeholder="内容" />
      {form.formState.errors.message && (
        <p>{form.formState.errors.message.message}</p>
      )}

      <button type="submit">提交</button>
    </form>
  )
}
```

---

## 5. 和 shadcn/ui 一起使用

即使没有 shadcn 的 `Form` 组件，也可以直接使用：

```txt
Label + Input + Textarea + Button
```

示例：

```tsx
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">名称</Label>
    <Input id="name" {...form.register("name")} />
    {form.formState.errors.name && (
      <p className="text-sm text-destructive">
        {form.formState.errors.name.message}
      </p>
    )}
  </div>

  <Button type="submit">提交</Button>
</form>
```

---

## 6. 服务端仍然要校验

不要只在客户端校验。

客户端校验只是为了用户体验，真正写入数据库前，服务端也必须再次校验。

示例：

```ts
const result = createClientSchema.safeParse(input)

if (!result.success) {
  return {
    success: false,
    error: result.error.flatten(),
  }
}

const data = result.data
```

---

## 7. 服务端生成字段

像下面这些字段不要让客户端传：

```txt
id
createdAt
updatedAt
status
```

推荐服务端生成：

```ts
const item = {
  id: `client_${crypto.randomUUID()}`,
  ...data,
  createdAt: new Date().toISOString(),
}
```

---

## 8. 推荐流程

```txt
用户填写表单
↓
React Hook Form 管理表单状态
↓
Zod 在客户端做一次校验
↓
提交到 Server Action / API Route
↓
服务端用同一个 Zod schema 再校验一次
↓
服务端生成 id、createdAt
↓
写入数据库 / DynamoDB
```

---

## 9. 常见注意事项

- schema 尽量复用，不要表单一份、API 一份重复写。
- `z.infer<typeof schema>` 用来生成 TypeScript 类型。
- 客户端组件使用 `useForm` 时，文件顶部需要 `"use client"`。
- React Hook Form 的 `defaultValues` 建议写完整，避免受控/非受控警告。
- 数据库写入前一定要在服务端 `safeParse`。
- 不要信任客户端传来的 `id`、`createdAt`。
- Zod 是运行时校验，TypeScript type 只是开发阶段提示。
