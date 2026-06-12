import { Link } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
              <Globe2 className="h-4 w-4 text-primary-foreground" />
            </div>
            anytimeEsim
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Instant travel eSIMs for 200+ countries. Activated in seconds, paid via WhatsApp.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/plans" className="hover:text-foreground">Plans</Link></li>
            <li><Link to="/countries" className="hover:text-foreground">Countries</Link></li>
            <li><Link to="/assistant" className="hover:text-foreground">AI Assistant</Link></li>
            <li><Link to="/compare" className="hover:text-foreground">Compare</Link></li>/


          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Get the app</h4>
          <p className="mt-3 text-sm text-muted-foreground">Available worldwide. Works on iPhone XS+ and modern Android.</p>
        </div>
      </div>
      <div className="border-t">
]]"
"        <div className="container mx-auto flex flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">""
          <p>© {new Date().getFullYear()} anytimeEsim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
