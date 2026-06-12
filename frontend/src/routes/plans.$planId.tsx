import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Check,
  Database,
  MessageCircle,
  Smartphone,
  Wifi,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/site/section";
import { PlanCard } from "@/components/site/plan-card";
import { buildWhatsappUrl, faqs, getPlansByCountry } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/plans/$planId")({
  component: PlanDetail,
  notFoundComponent: () => (
    <Section>
      <p className="text-center text-muted-foreground">Plan not found.</p>
    </Section>
  ),
});

function PlanDetail() {
  const { planId } = Route.useParams();
  const { plans, pushRecent } = useStore();
  const plan = plans.find((p) => p.id === planId);
  useEffect(() => {
    if (plan) pushRecent(plan.id);
  }, [plan, pushRecent]);

  if (!plan) throw notFound();

  const related = getPlansByCountry(plan.countryCode).filter((p) => p.id !== plan.id);

  return (
    <>
      <Section className="!pb-6">
        <Link to="/plans"><Button variant="ghost" size="sm"><ArrowLeft className="mr-1 h-4 w-4" /> All plans</Button></Link>
      </Section>

      <Section className="!pt-4 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{plan.flag}</span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{plan.country} eSIM</h1>
              <p className="text-muted-foreground">{plan.data} · {plan.validityDays} days · {plan.network}</p>
            </div>
            {plan.popular && <Badge className="ml-auto bg-gradient-primary text-primary-foreground border-0">Popular</Badge>}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="p-5"><div className="flex items-center gap-3"><Database className="h-5 w-5 text-primary" /><div><div className="text-xs text-muted-foreground">Data</div><div className="font-semibold">{plan.data}</div></div></div></Card>
            <Card className="p-5"><div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-primary" /><div><div className="text-xs text-muted-foreground">Validity</div><div className="font-semibold">{plan.validityDays} days</div></div></div></Card>
            <Card className="p-5"><div className="flex items-center gap-3"><Wifi className="h-5 w-5 text-primary" /><div><div className="text-xs text-muted-foreground">Network</div><div className="font-semibold">{plan.network} · Quality {plan.quality}/5</div></div></div></Card>
            <Card className="p-5"><div className="flex items-center gap-3"><Smartphone className="h-5 w-5 text-primary" /><div><div className="text-xs text-muted-foreground">Hotspot</div><div className="font-semibold">{plan.hotspot ? "Supported" : "Not supported"}</div></div></div></Card>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Supported carriers</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {plan.carriers.map((c) => <Badge key={c} variant="outline">{c}</Badge>)}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Activation in 60 seconds</h3>
            <ol className="mt-4 space-y-3 text-sm">
              {["Complete purchase via WhatsApp", "Receive your eSIM QR code instantly", "Scan in iPhone Settings → Cellular → Add eSIM", "Land at your destination and turn on data roaming"].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold">Plan FAQ</h3>
            <Accordion type="single" collapsible className="mt-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6 glass">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">${plan.price}</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Instant delivery via WhatsApp</div>
              <div className="flex gap-2"><Check className="h-4 w-4 text-primary" /> 24/7 traveler support</div>
              <div className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Money-back guarantee</div>
            </div>
            <a href={buildWhatsappUrl(plan)} target="_blank" rel="noreferrer" className="mt-6 block">
              <Button size="lg" className="w-full bg-[#25D366] text-white hover:opacity-90">
                <MessageCircle className="mr-2 h-4 w-4" /> Buy on WhatsApp
              </Button>
            </a>
            <Link to="/assistant" className="mt-3 block">
              <Button size="lg" variant="outline" className="w-full">
                <Wand2 className="mr-2 h-4 w-4" /> Ask AI for advice
              </Button>
            </Link>
          </Card>
        </aside>
      </Section>

      {related.length > 0 && (
        <Section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">More plans for {plan.country}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => <PlanCard key={p.id} plan={p} index={i} />)}
          </div>
        </Section>
      )}
    </>
  );
}