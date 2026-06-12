import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/section";
import { Card } from "@/components/ui/card";
import { Globe, Shield, Zap, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — anytimeEsim" },
      { name: "description", content: "anytimeEsim is on a mission to make global connectivity effortless." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeader eyebrow="Our story" title="Connectivity should travel with you" subtitle="anytimeEsim was born out of countless roaming bills, broken connections at airports, and the frustration of buying physical SIMs in unfamiliar languages." />
      </Section>
      <Section className="!pt-0">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: Globe, k: "200+", v: "Countries covered" },
            { icon: Users, k: "250K+", v: "Travelers served" },
            { icon: Zap, k: "60s", v: "Average activation" },
            { icon: Shield, k: "4.9★", v: "Customer rating" },
          ].map((s) => (
            <Card key={s.v} className="p-6 text-center">
              <s.icon className="mx-auto h-6 w-6 text-primary" />
              <div className="mt-3 text-2xl font-bold tracking-tight">{s.k}</div>
              <div className="text-xs text-muted-foreground">{s.v}</div>
            </Card>
          ))}
        </div>
      </Section>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-muted-foreground">
          <p>We partner with top-tier mobile carriers in every region — Docomo, EE, Etisalat, Telstra, T-Mobile and dozens more — to deliver native-quality data without the native-price tag.</p>
          <p>Our model is simple: a transparent marketplace, AI-powered guidance, and human support over WhatsApp. No contracts, no surprises, no SIM swap drama.</p>
        </div>
      </Section>
    </>
  );
}