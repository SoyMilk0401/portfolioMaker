import type { TechStack } from "@/types/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { FaLaptopCode, FaHtml5, FaCloud } from "react-icons/fa";
import { FaServer } from "react-icons/fa6";

export default function ViewTechStack({ techstack }: { techstack: TechStack }) {
  return (
    <section className="w-full px-4 py-12 bg-white" data-aos="fade-up">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold">Tech Stack</h2>
        <p className="text-gray-500 text-sm mt-2">사용 기술을 분야별로 정리했습니다.</p>
      </div>

      <Card className="max-w-5xl mx-auto p-6 shadow">
        <CardContent className="space-y-6">
          <StackItem icon={<FaLaptopCode size={28} />} label="Language" items={techstack.language} />
          <StackItem icon={<FaHtml5 size={28} />} label="Frontend" items={techstack.frontend} />
          <StackItem icon={<FaServer size={26} />} label="Backend" items={techstack.backend} />
          <StackItem icon={<FaCloud size={26} />} label="DevOps" items={techstack.devops} />
        </CardContent>
      </Card>
    </section>
  );
}

function StackItem({
  icon,
  label,
  items,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
}) {
  return (
    <div className="flex items-start gap-6">
      <div className="flex items-center min-w-[120px] text-blue-600 gap-2">
        {icon}
        <span className="font-semibold text-base">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">-</span>
        )}
      </div>
    </div>
  );
}
