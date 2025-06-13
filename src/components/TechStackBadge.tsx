import { Badge } from "@/components/ui/badge"
import type { TechStack } from "@/types/portfolio";

export default function TechStackBadge({ techStack }: { techStack: TechStack }) {

  return (
    <>
      {techStack.language.map((tech) => (
        <Badge key={tech} variant="default" className="bg-gray-700">
          {tech}
        </Badge>
      ))}
      {techStack.frontend.map((tech) => (
        <Badge key={tech} variant="secondary" className="bg-blue-100">
          {tech}
        </Badge>
      ))}
      {techStack.backend.map((tech) => (
        <Badge key={tech} variant="secondary" className="bg-sky-50">
          {tech}
        </Badge>
      ))}
      {techStack.devops.map((tech) => (
        <Badge key={tech} variant="secondary" className="bg-indigo-50">
          {tech}
        </Badge>
      ))}
    </>
  );
}