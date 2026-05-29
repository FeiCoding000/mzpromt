import { InboxIcon, Calculator, CircleDollarSign, Handshake } from "lucide-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Post } from "@/db/schema"
export default function PostListItem( { post }: { post: Post }) {
    const iconMap = {
        "Tax": <CircleDollarSign />,
        "Accounting": <Calculator />,
        "Business": <Handshake />,
    }
    return (
        <Item>
            <ItemMedia>
                {iconMap[post.category]} 
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{post.title}</ItemTitle>
                <ItemDescription>{post.excerpt}</ItemDescription>
            </ItemContent>
        </Item>
    )
}
