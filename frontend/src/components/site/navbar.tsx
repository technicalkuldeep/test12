import { Link, useRouterState } from "@tanstack/react-router";
import { Globe2, Menu, X, GitCompare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/countries", label: "Countries" },
  { to: "/plans", label: "Plans" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { compare } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
  to="/"
  className="flex items-center gap-3 transition-opacity hover:opacity-90"
>
  <img
    src="https://www.anytimeesim.com/static/images/logo_t.png"
    alt="anytimeEsim"
    className="h-20 w-auto object-contain"
  />

  <span className="text-lg font-bold tracking-tight">
    anytimeEsim
  </span>
</Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/compare" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="relative">
                <GitCompare className="h-4 w-4" />
                {compare.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {compare.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/plans" className="hidden md:block">
              <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                Get eSIM
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <nav className="border-t md:hidden">
            <div className="container mx-auto flex flex-col px-4 py-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/compare" onClick={() => setOpen(false)} className="py-3 text-sm text-muted-foreground hover:text-foreground">
                Compare ({compare.length})
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}