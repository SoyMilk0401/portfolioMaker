import type { TechStack } from "@/types/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { FaLaptopCode, FaHtml5, FaCloud } from "react-icons/fa";
import { FaServer } from "react-icons/fa6";

export default function ViewTechStack({ techstack }: { techstack: TechStack }) {
  return (
    <div className="w-full max-w-5xl mx-auto" data-aos="fade-up">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Tech Stack</h2>
        <p className="text-gray-500 mt-3 text-lg">사용 기술을 분야별로 정리했습니다.</p>
      </div>

      <Card className="p-8 shadow-sm border-gray-200">
        <CardContent className="space-y-8">
          <StackItem icon={<FaLaptopCode size={28} />} label="Language" items={techstack.language} />
          <StackItem icon={<FaHtml5 size={28} />} label="Frontend" items={techstack.frontend} />
          <StackItem icon={<FaServer size={28} />} label="Backend" items={techstack.backend} />
          <StackItem icon={<FaCloud size={28} />} label="DevOps" items={techstack.devops} />
        </CardContent>
      </Card>
    </div>
  );
}

function StackItem({ icon, label, items }: { icon: React.ReactNode; label: string; items: string[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="flex items-center min-w-[140px] text-slate-700 gap-3">
        <span className="text-blue-600">{icon}</span>
        <span className="font-semibold text-lg">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2.5 flex-1">
        {items.length > 0 ? (
          items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="bg-slate-100 text-slate-700 font-medium px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-slate-200"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm py-1.5">-</span>
        )}
      </div>
    </div>
  );
}