"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="dark-mode"
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <Label htmlFor="dark-mode" className="flex items-center gap-2">
                {isDark ? (
                    <>
                        <Moon className="h-4 w-4" />
                        <span>Dark Mode</span>
                    </>
                ) : (
                    <>
                        <Sun className="h-4 w-4" />
                        <span>Light Mode</span>
                    </>
                )}
            </Label>
        </div>
    );
}
