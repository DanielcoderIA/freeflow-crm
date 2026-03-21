import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-30">
            <div className="flex h-16 items-center px-4 md:px-6">
                <Button variant="ghost" size="icon" className="mr-4 lg:hidden" onClick={onMenuClick}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 w-full">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full sm:w-[300px]"
                            />
                        </div>
                    </form>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
