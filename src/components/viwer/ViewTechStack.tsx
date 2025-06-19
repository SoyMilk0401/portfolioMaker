import type { TechStack } from "@/types/portfolio";
import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function ViewTechStack({ techstack }: { techstack: TechStack }) {

    return (
        <div className="w-full px-0">
            <div className="max-w-3xl mx-auto">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    Tech Stack
                </h1>
                <Card>
                    <CardContent>
                        <p>{techstack.frontend}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
    
}