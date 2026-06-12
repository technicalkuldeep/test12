import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Search, Zap, Globe, Shield, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeader } from "@/components/site/section";
import { CountryCard } from "@/components/site/country-card";
import { PlanCard } from "@/components/site/plan-card";
import { countries, faqs, testimonials } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "anytimeEsim — Travel eSIMs for 200+ countries" },
      { name: "description", content: "Instant travel eSIMs activated in seconds. Compare plans, get AI recommendations, and pay via WhatsApp." },
      { property: "og:title", content: "anytimeEsim — Stay Connected Anywhere" },
      { property: "og:description", content: "Premium travel eSIM marketplace. 200+ countries. Instant activation." },
    ],
  }),
  component: Index,
});

function Index() {
  const { plans } = useStore();

  const [query, setQuery] = useState("");
  const navigate = Route.useNavigate();
  const popular = [...countries].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  const popularPlans = [...plans]
  .filter((p) => p.popular)
  .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-16 pb-20 md:pt-28 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground glass">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Trusted by 250,000+ travelers worldwide
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Stay Connected <span className="text-gradient">Anywhere</span> in the World
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground md:text-lg">
              Instant travel eSIMs in 200+ countries. Activate in 60 seconds, no physical SIM, no roaming bills.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/plans", search: { country: undefined, q: query } });
              }}
              className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border bg-card/60 p-2 glass shadow-elegant"
            >
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a country e.g. Japan, Spain, UAE"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
              <Button type="submit" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                Find Your Plan <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              {["Japan", "UAE", "Thailand", "USA", "Spain", "Italy"].map((c) => (
                <Link key={c} to="/plans" search={{ q: c }} className="rounded-full border bg-card/40 px-3 py-1 hover:border-primary/40 hover:text-foreground">
                  {c}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular destinations */}
      <Section className="!py-12">
        <SectionHeader eyebrow="Popular destinations" title="Where travelers go" subtitle="Browse the most-loved destinations on anytimeEsim this month." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {popular.map((c, i) => (
            <CountryCard key={c.code} country={c} index={i} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/countries"><Button variant="outline">Explore all countries <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeader eyebrow="Why anytimeEsim" title="Built for modern travelers" subtitle="A premium eSIM experience that just works — anywhere on earth." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Zap, t: "Instant activation", d: "Live in 60 seconds. No store visits, no waiting." },
            { icon: Shield, t: "No physical SIM", d: "Keep your home number. Run the eSIM as a second line." },
            { icon: Globe, t: "200+ countries", d: "Premium carriers in every region you'll ever visit." },
            { icon: DollarSign, t: "Affordable data", d: "Up to 95% cheaper than international roaming." },
          ].map((b, i) => (
            <motion.div key={b.t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{b.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Popular plans */}
      <Section>
        <SectionHeader eyebrow="Popular plans" title="Loved by travelers" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {popularPlans.length > 0 ? (
    popularPlans.map((p, i) => (
      <PlanCard key={p.id} plan={p} index={i} />
    ))
  ) : (
    <Card className="col-span-full p-8 text-center">
      <p className="text-muted-foreground">
        No featured plans available yet.
      </p>
    </Card>
  )}
</div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader eyebrow="Loved worldwide" title="What travelers say" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full p-6">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Card className="overflow-hidden border-0 bg-gradient-primary p-10 text-center text-primary-foreground md:p-16">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Your next trip, online in 60 seconds.</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">Browse plans, get an AI recommendation, and check out via WhatsApp.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/plans"><Button size="lg" variant="secondary">Browse plans</Button></Link>
            <Link to="/assistant"><Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">Ask the AI</Button></Link>
          </div>
        </Card>
      </Section>
    </>
  );
}
