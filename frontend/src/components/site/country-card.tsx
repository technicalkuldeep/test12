import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { Country } from "@/lib/mock-data";
import { getPlansByCountry, getStartingPrice } from "@/lib/mock-data";

export function CountryCard({ country, index = 0 }: { country: Country; index?: number }) {
  const plansCount = getPlansByCountry(country.code).length;
  const price = getStartingPrice(country.code);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 12) * 0.02 }}
    >
      <Link to="/plans" search={{ country: country.code }}>
        <Card className="group relative cursor-pointer overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
          <div className="flex items-start justify-between">
            <span className="text-4xl">{country.flag}</span>
            <span className="text-xs text-muted-foreground">{country.region}</span>
          </div>
          <div className="mt-4 font-semibold">{country.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{plansCount} plans available</div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-xs text-muted-foreground">from</span>
            <span className="text-lg font-bold text-gradient">${price}</span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}