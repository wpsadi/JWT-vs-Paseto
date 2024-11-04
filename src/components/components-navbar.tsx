"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

export function NavbarComponent() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">JWT vs PASETO</span>
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Home
          </Link>
          <Link
            href="/use"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/use" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Use
          </Link>
        </div>
      </div>
    </nav>
  )
}