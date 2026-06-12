import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/site/section";
import { buildWhatsappUrl } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare plans — anytimeEsim" }] }),
  component: ComparePage,
});

function ComparePage() {
  const { compare, plans, toggleCompare, clearCompare } = useStore();
  const selected = plans.filter((p) => compare.includes(p.id));

  if (selected.length === 0) {
    return (
      <Section>
        <SectionHeader eyebrow="Compare" title="No plans selected" subtitle="Add up to 4 plans to compare side-by-side." />
        <div className="text-center">
          <Link to="/plans"><Button className="bg-gradient-primary text-primary-foreground">Browse plans</Button></Link>
        </div>
      </Section>
    );
  }

  const rows: { label: string; render: (p: (typeof selected)[number]) => React.ReactNode }[] = [
    { label: "Country", render: (p) => <>{p.flag} {p.country}</> },
    { label: "Price", render: (p) => <span className="font-semibold">${p.price}</span> },
    { label: "Data", render: (p) => p.data },
    { label: "Validity", render: (p) => `${p.validityDays} days` },
    { label: "Network", render: (p) => p.network },
    { label: "Quality", render: (p) => `${p.quality}/5` },
    { label: "Hotspot", render: (p) => p.hotspot ? <Check className="h-4 w-4 text-primary" /> : <Minus className="h-4 w-4 text-muted-foreground" /> },
    { label: "Carriers", render: (p) => p.carriers.join(", ") },
  ];

  return (
    <Section>
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader eyebrow="Compare" title={`Comparing ${selected.length} plan${selected.length > 1 ? "s" : ""}`} />
        <Button variant="ghost" size="sm" onClick={clearCompare}>Clear all</Button>
      </div>
      <div className="overflow-x-auto">
        <Card className="min-w-[640px] p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left text-xs uppercase tracking-wider text-muted-foreground">Feature</th>
                {selected.map((p) => (
                  <th key={p.id} className="p-4 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <span>{p.flag} {p.country}<div className="text-xs font-normal text-muted-foreground">{p.data} · {p.validityDays}d</div></span>
                      <button onClick={() => toggleCompare(p.id)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b last:border-0">
                  <td className="p-4 text-muted-foreground">{r.label}</td>
                  {selected.map((p) => <td key={p.id} className="p-4">{r.render(p)}</td>)}
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                {selected.map((p) => (
                  <td key={p.id} className="p-4">
                    <a href={buildWhatsappUrl(p)} target="_blank" rel="noreferrer">
                      <Button size="sm" className="w-full bg-gradient-primary text-primary-foreground">Buy</Button>
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </Section>
  );
}