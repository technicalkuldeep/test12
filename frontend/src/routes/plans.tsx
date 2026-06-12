import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section, SectionHeader } from "@/components/site/section";
import { PlanCard } from "@/components/site/plan-card";
import { countries, regions } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

type PlansSearch = { country?: string; region?: string; q?: string };

export const Route = createFileRoute("/plans")({
  validateSearch: (s: Record<string, unknown>): PlansSearch => ({
    country: typeof s.country === "string" ? s.country : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Plans — anytimeEsim" },
      { name: "description", content: "Compare travel eSIM plans by country, data and price." },
    ],
  }),
  component: PlansPage,
});

function PlansPage() {
  const { country, region, q: initialQ } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { plans } = useStore();
  const [q, setQ] = useState(initialQ ?? "");
  const [price, setPrice] = useState<number[]>([60]);
  const [validity, setValidity] = useState<string>("all");
  const [data, setData] = useState<string>("all");

  const filtered = useMemo(() => {
    return plans.filter((p) => {
      if (country && p.countryCode !== country) return false;
      if (region && region !== "all") {
        const c = countries.find((c) => c.code === p.countryCode);
        if (c?.region !== region) return false;
      }
      if (q && !p.country.toLowerCase().includes(q.toLowerCase())) return false;
      if (p.price > price[0]) return false;
      if (validity === "7" && p.validityDays > 7) return false;
      if (validity === "15" && (p.validityDays < 8 || p.validityDays > 15)) return false;
      if (validity === "30" && p.validityDays < 16) return false;
      if (data === "small" && p.dataGb > 3) return false;
      if (data === "medium" && (p.dataGb < 5 || p.dataGb > 10)) return false;
      if (data === "large" && p.dataGb < 20 && p.dataGb !== 999) return false;
      return true;
    });
  }, [plans, country, region, q, price, validity, data]);

  const activeCountry = country ? countries.find((c) => c.code === country) : null;

  return (
    <Section>
      <SectionHeader
        eyebrow="Plans"
        title={activeCountry ? `${activeCountry.flag} ${activeCountry.name} eSIM plans` : "All eSIM plans"}
        subtitle="Use the filters below to find the perfect plan for your trip."
      />

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="flex items-center gap-2 rounded-lg border bg-card/60 px-3 glass">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search country" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
        </div>
        <Select
          value={region ?? "all"}
          onValueChange={(v) =>
            navigate({ search: (prev: PlansSearch) => ({ ...prev, region: v === "all" ? undefined : v }) })
          }
        >
          <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Region" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={validity} onValueChange={setValidity}>
          <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Validity" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any validity</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="15">8–15 days</SelectItem>
            <SelectItem value="30">30+ days</SelectItem>
          </SelectContent>
        </Select>
        <Select value={data} onValueChange={setData}>
          <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Data" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any data</SelectItem>
            <SelectItem value="small">Light (≤3GB)</SelectItem>
            <SelectItem value="medium">Medium (5–10GB)</SelectItem>
            <SelectItem value="large">Heavy (20GB+ / Unlimited)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-8 rounded-lg border bg-card/40 p-4 glass">
        <div className="flex items-center gap-2 text-sm">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Max price</span>
          <span className="ml-auto font-semibold">${price[0]}</span>
        </div>
        <Slider value={price} onValueChange={setPrice} min={5} max={60} step={1} className="mt-3" />
      </div>

      {country && (
        <div className="mb-4">
          <Link to="/plans" search={{}}>
            <Button variant="ghost" size="sm">← Clear country filter</Button>
          </Link>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-card/40 p-12 text-center text-muted-foreground">No plans match your filters.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => <PlanCard key={p.id} plan={p} index={i} />)}
        </div>
      )}
    </Section>
  );
}