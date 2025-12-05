import type { RelatedLink } from "@/types/portfolio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ViewRelatedLink({ relatedlink }: { relatedlink: RelatedLink[] }) {
  const ensureAbsoluteUrl = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="300">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">LINKS</h2>
        <p className="text-gray-500 mt-2 text-lg">관련 링크들을 확인해보세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedlink.map((link) => (
          <Card key={link.url} className="p-6 shadow-sm hover:shadow-md transition bg-white border-gray-200 group flex flex-col h-full">
            <CardHeader className="p-0 mb-4 flex-grow">
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors mb-2">
                {link.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 line-clamp-3">
                {link.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 mt-auto pt-4 border-t border-gray-100 flex justify-start">
              <Button variant="outline" size="sm" asChild className="gap-2 rounded-full h-8 text-xs sm:text-sm">
                <a
                  href={ensureAbsoluteUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt size={12} />
                  Visit Link
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}