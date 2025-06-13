import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { Card, CardContent } from "@/components/ui/card";

export default function CreatePortfolioButton() {
  const navigate = useNavigate();
  const handleCreate = () => {
    const newId = uuidv4();
    navigate(`/edit/${newId}`);
  };
  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300 cursor-pointer h-[180px]">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <button
          onClick={handleCreate}
          className="flex flex-col items-center gap-2 focus:outline-none"
        >
          {/* + 아이콘 (SVG) */}
          <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 mb-2">
            <circle cx="18" cy="18" r="17" stroke="currentColor" strokeDasharray="4 2" fill="none"/>
            <line x1="18" y1="10" x2="18" y2="26" stroke="currentColor" />
            <line x1="10" y1="18" x2="26" y2="18" stroke="currentColor" />
          </svg>
          <span className="text-gray-500 font-medium">포트폴리오 만들기</span>
        </button>
      </CardContent>
    </Card>
  );
}