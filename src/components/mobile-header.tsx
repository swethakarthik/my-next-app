import { ArrowLeft, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MobileHeaderProps {
  showBack?: boolean;
  showSearch?: boolean;
  showOptions?: boolean;
  onSearch?: (query: string) => void;
}

export function MobileHeader({
  showBack = true,
  showSearch = false,
  showOptions = true,
  onSearch,
}: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#f3f2ef] z-50">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          {showSearch && (
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-2 bg-[#eef3f8] border-none rounded-full h-9 text-sm"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        {showOptions && (
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
            <MoreVertical className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
} 