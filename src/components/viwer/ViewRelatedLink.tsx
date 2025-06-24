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
    <section className="w-full px-4 py-12 bg-white" data-aos="fade-up" data-aos-delay="300">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold">LINKS</h2>
        <p className="text-gray-500 text-sm mt-2">관련 링크들을 확인해보세요.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {relatedlink.map((link) => (
          <Card key={link.url} className="p-5 shadow-sm hover:shadow-md transition">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">{link.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">{link.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <a
                href={ensureAbsoluteUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 text-sm hover:underline"
              >
                {link.url}
                <FaExternalLinkAlt size={12} />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
