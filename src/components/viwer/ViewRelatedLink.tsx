import type { RelatedLink } from "@/types/portfolio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ViewRelatedLink({relatedlink} : {relatedlink: RelatedLink[]}) {

    return (
        <div className="w-full px-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    LINKS
                </h1>
                <div className="grid grid-cols-2 gap-4 mt-8">
                {relatedlink.map((link) => (
                        <Card key={link.url}>
                            <CardHeader>
                                <CardTitle>{link.name}</CardTitle>
                                <CardDescription>{link.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="link" className="px-0">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                                </Button>
                            </CardContent>
                        </Card>
                ))}
                </div>
            </div>
        </div>
    )
}