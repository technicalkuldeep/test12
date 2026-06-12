import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wifi, Calendar, Database, Sparkles, Check, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buildWhatsappUrl, type Plan } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PlanCard({ plan, index = 0 }: { plan: Plan; index?: number }) {
  const { compare, toggleCompare } = useStore();
  const inCompare = compare.includes(plan.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
    >
      <Card className="group relative overflow-hidden p-5 transition-all hover:-translate-y-1 hover:shadow-glow">
        {plan.popular && (
          <Badge className="absolute right-3 top-3 border-0 bg-gradient-primary text-primary-foreground">
            <Sparkles className="mr-1 h-3 w-3" /> Popular
          </Badge>
        )}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{plan.flag}</span>
          <div>
            <div className="font-semibold">{plan.country}</div>
            <div className="text-xs text-muted-foreground">{plan.carriers.join(" · ")}</div>
          </div>
        </div>
        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight">${plan.price}</span>
          <span className="text-sm text-muted-foreground">/ plan</span>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2"><Database className="h-4 w-4 text-primary" /> {plan.data} data</div>
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {plan.validityDays} days validity</div>
          <div className="flex items-center gap-2"><Wifi className="h-4 w-4 text-primary" /> {plan.network} · Quality {plan.quality}/5</div>
          {plan.hotspot && (
            <div className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-primary" /> Hotspot supported</div>
          )}
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Link to="/plans/$planId" params={{ planId: plan.id }} className="flex-1">
            <Button variant="secondary" className="w-full">View</Button>
          </Link>
          <a href={buildWhatsappUrl(plan)} target="_blank" rel="noreferrer" className="flex-1">
            <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">Buy</Button>
          </a>
          <Button
            size="icon"
            variant="outline"
            onClick={() => toggleCompare(plan.id)}
            className={cn(inCompare && "border-primary text-primary")}
            aria-label="Toggle compare"
          >
            <GitCompare className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}