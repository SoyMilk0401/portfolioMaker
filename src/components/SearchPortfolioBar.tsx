import { Input } from "@/components/ui/input"

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchPortfolioBar({ value, onChange }: SearchBarProps ) {

    return (
        <Input
            type="text"
            placeholder="검색"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    )
}