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
import { Moon, Sun, Menu, ChevronDown, Layout } from "lucide-react";
import { TOOL_CATEGORIES, getToolsByCategory } from "@/lib/data/tools";

export function SiteNav() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-2.5">
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="UML Diagram Studio"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-sm sm:text-base font-semibold">
              <span className="hidden sm:inline">UML Diagram Studio</span>
              <span className="sm:hidden">UML Studio</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Tools
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 max-h-[70vh] overflow-y-auto">
                <DropdownMenuItem asChild>
                  <Link href="/tools" className="font-medium">
                    All tools
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {TOOL_CATEGORIES.map((category) => (
                  <div key={category.id}>
                    <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
                    {getToolsByCategory(category.id).map((tool) => (
                      <DropdownMenuItem key={tool.slug} asChild>
                        <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8"
                aria-label="Menu"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 max-h-[70vh] overflow-y-auto">
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
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
                  {getToolsByCategory(category.id).map((tool) => (
                    <DropdownMenuItem key={tool.slug} asChild>
                      <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {mounted ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8"
              aria-label="Toggle theme"
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
              className="h-8 w-8"
              aria-label="Toggle theme"
            >
              <Moon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
