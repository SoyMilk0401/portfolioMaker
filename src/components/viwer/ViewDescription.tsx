import type { Description } from "@/types/portfolio";

export default function ViewDescription({ description }: { description: Description }) {
    return (
        <div className="w-full px-4 pt-10 pb-6" data-aos="fade-down" data-aos-duration="1000">
            <div className="max-w-6xl mx-auto text-center space-y-6">
                <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full mb-2">
                    Portfolio
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight text-balance">
                    {description.title}
                </h1>
                {description.detail && (
                    <div className="max-w-5xl mx-auto mt-6">
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light whitespace-pre-wrap text-balance">
                            {description.detail}
                        </p>
                    </div>
                )}
                <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mt-8 opacity-80"></div>
            </div>
        </div>
    )
}