import type { Description } from "@/types/portfolio";

export default function ViewDescription({ description }: { description: Description }) {

    return (
        <div className="w-full px-0" data-aos="fade-right">
            <div className="max-w-4xl mx-auto">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    {description.title}
                </h1>
                {description.detail && 
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center mt-8">
                    {description.detail}
                </h3>}
            </div>
        </div>
    )
}