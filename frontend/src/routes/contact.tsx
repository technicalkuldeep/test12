import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section, SectionHeader } from "@/components/site/section";
import { WHATSAPP_NUMBER } from "@/lib/mock-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — anytimeEsim" },
      { name: "description", content: "Reach our 24/7 traveler support team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent. We'll reply within 30 minutes.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };
  return (
    <Section>
      <SectionHeader eyebrow="Contact" title="We're here, 24/7" subtitle="WhatsApp is the fastest channel. Most replies under 5 minutes." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Name</Label><Input required className="mt-1.5" placeholder="Your name" /></div>
              <div><Label>Email</Label><Input required type="email" className="mt-1.5" placeholder="you@example.com" /></div>
            </div>
            <div><Label>Subject</Label><Input required className="mt-1.5" placeholder="What can we help with?" /></div>
            <div><Label>Message</Label><Textarea required className="mt-1.5 min-h-32" placeholder="Tell us more…" /></div>
            <Button type="submit" disabled={loading} className="bg-gradient-primary text-primary-foreground">
              {loading ? "Sending…" : "Send message"}
            </Button>
          </form>
        </Card>
        <div className="space-y-3">
          <Card className="p-5"><div className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-primary" /><div><div className="text-sm font-semibold">WhatsApp</div><a className="text-xs text-muted-foreground hover:text-foreground" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">+{WHATSAPP_NUMBER}</a></div></div></Card>
          <Card className="p-5"><div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /><div><div className="text-sm font-semibold">Email</div><div className="text-xs text-muted-foreground">hello@anytimeEsim.app</div></div></div></Card>
          <Card className="p-5"><div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /><div><div className="text-sm font-semibold">HQ</div><div className="text-xs text-muted-foreground">Singapore · Remote-first</div></div></div></Card>
        </div>
      </div>
    </Section>
  );
}