'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, FileCode, Menu, Layout } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Template } from "@shared/schema";
import { TOOL_CATEGORIES, getToolsByCategory } from "@/lib/data/tools";

interface StudioTopBarProps {
  onTemplateSelect: (code: string) => void;
}

export function StudioTopBar({ onTemplateSelect }: StudioTopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const templatesByCategory = templates.reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <header className="flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3 border-b bg-card">
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="UML Diagram Studio Logo"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-sm sm:text-base font-semibold">
            <span className="hidden sm:inline">UML Diagram Studio</span>
            <span className="sm:hidden">UML Studio</span>
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="px-2 sm:px-3">
              <FileCode className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
              <div key={category}>
                <DropdownMenuLabel className="capitalize">
                  {category} Diagrams
                </DropdownMenuLabel>
                {categoryTemplates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onClick={() => onTemplateSelect(template.code)}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-sm">{template.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center">
        <Link href="/tools">
          <Button variant="ghost" size="sm">
            Tools
          </Button>
        </Link>
        <Link href="/studio">
          <Button variant="ghost" size="sm">
            <Layout className="w-4 h-4 mr-1.5" />
            Studio
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="ghost" size="sm">
            About
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost" size="sm">
            Contact
          </Button>
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 md:hidden" aria-label="Menu">
            <Menu className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 max-h-[70vh] overflow-y-auto">
          <DropdownMenuItem asChild>
            <Link href="/tools">All tools</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/studio">Studio</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/about">About</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contact">Contact</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {TOOL_CATEGORIES.map((category) => (
            <div key={category.id}>
              <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
              {getToolsByCategory(category.id).slice(0, 4).map((tool) => (
                <DropdownMenuItem key={tool.slug} asChild>
                  <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-1 sm:gap-2">
        {mounted ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-7 w-7 sm:h-8 sm:w-8"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            aria-label="Toggle Theme"
          >
            <Moon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
