import type { Post } from "@/db/schema";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src={post.coverImageUrl?? "/default-image.jpg"}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-90 grayscale(10%) dark:brightness-80"
        width={800}
        height={400}
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{post.category}</Badge>
        </CardAction>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Read More</Button>
      </CardFooter>
    </Card>
  );
}
