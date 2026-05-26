"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CatergoryFilter( { categories, onCategorySelect }: { categories: string[]; onCategorySelect: (category: string) => void } ) {
    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                    index === 0 ? <Button key={index} variant="link" onClick={() => onCategorySelect(category)}>
                        {category}
                    </Button> : 
                    <div key={index} className="flex items-center">
                        <Separator orientation="vertical" className="mx-2 h-full" />
                        <Button variant="link" onClick={() => onCategorySelect(category)}>
                            {category}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}