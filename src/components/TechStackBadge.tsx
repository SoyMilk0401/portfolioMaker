import { Badge } from "@/components/ui/badge"
import type { TechStack } from "@/types/portfolio";

export default function TechStackBadge({ techStack }: { techStack: TechStack }) {

  return (
    <>
      {techStack.language.map((tech) => (
        <Badge key={tech} variant="default" className="bg-gray-700 text-xs px-2 py-0.5 h-5">
          {tech}
        </Badge>
      ))}
      {techStack.frontend.map((tech) => (
        <Badge key={tech} variant="secondary" className="bg-blue-100 text-xs px-2 py-0.5 h-5">
          {tech}
        </Badge>
      ))}
      {techStack.backend.map((tech) => (
        <Badge key={tech} variant="secondary" className="bg-sky-50 text-xs px-2 py-0.5 h-5">
          {tech}
        </Badge>
      ))}
      {techStack.devops.map((tech) => (
        <Badge key={tech} variant="secondary" className="bg-indigo-50 text-xs px-2 py-0.5 h-5">
          {tech}
        </Badge>
      ))}
    </>
  );
}