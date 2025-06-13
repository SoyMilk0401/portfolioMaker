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
            className="mt-4"
        />
    )
}