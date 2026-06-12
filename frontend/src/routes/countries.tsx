import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section, SectionHeader } from "@/components/site/section";
import { CountryCard } from "@/components/site/country-card";
import { countries, regions, getStartingPrice } from "@/lib/mock-data";

export const Route = createFileRoute("/countries")({
  head: () => ({
    meta: [
      { title: "Countries — anytimeEsim" },
      { name: "description", content: "Browse eSIM coverage across 200+ destinations." },
    ],
  }),
  component: CountriesPage,
});

function CountriesPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("all");
  const [sort, setSort] = useState<string>("popular");

  const list = useMemo(() => {
    let l = countries.filter((c) =>
      (region === "all" || c.region === region) &&
      c.name.toLowerCase().includes(q.toLowerCase()),
    );
    if (sort === "popular") l = [...l].sort((a, b) => b.popularity - a.popularity);
    if (sort === "price") l = [...l].sort((a, b) => getStartingPrice(a.code) - getStartingPrice(b.code));
    if (sort === "name") l = [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [q, region, sort]);

  return (
    <Section>
      <SectionHeader eyebrow="Countries" title="Explore eSIM coverage" subtitle="Filter by region, sort by price or popularity." />
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border bg-card/60 px-3 glass">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search country" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
        </div>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Region" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most popular</SelectItem>
            <SelectItem value="price">Lowest price</SelectItem>
            <SelectItem value="name">A → Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {list.length === 0 ? (
        <div className="rounded-lg border bg-card/40 p-12 text-center text-muted-foreground">No countries match your search.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((c, i) => <CountryCard key={c.code} country={c} index={i} />)}
        </div>
      )}
    </Section>
  );
}