import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User2, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/site/section";
import { PlanCard } from "@/components/site/plan-card";
import { countries, plans, type Plan } from "@/lib/mock-data";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Travel Assistant — anytimeEsim" },
      { name: "description", content: "Get instant eSIM recommendations from our AI travel assistant." },
    ],
  }),
  component: AssistantPage,
});

type Msg =
  | { id: string; role: "bot" | "user"; text: string }
  | { id: string; role: "bot"; recs: Plan[]; estimate: string; savings: string };

type Step = "country" | "days" | "usage" | "done";

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "1", role: "bot", text: "Hey traveler! I'll help you pick the perfect eSIM in 30 seconds. Which country are you visiting?" },
  ]);
  const [step, setStep] = useState<Step>("country");
  const [input, setInput] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const push = (m: Msg) => setMessages((p) => [...p, m]);

  const reset = () => {
    setMessages([{ id: crypto.randomUUID(), role: "bot", text: "Restarted! Which country are you visiting?" }]);
    setStep("country");
    setCountry(null);
    setDays(null);
    setInput("");
  };

  const handleSend = (value?: string) => {
    const text = (value ?? input).trim();
    if (!text) return;
    push({ id: crypto.randomUUID(), role: "user", text });
    setInput("");

    setTimeout(() => {
      if (step === "country") {
        const match = countries.find((c) => c.name.toLowerCase().includes(text.toLowerCase()));
        if (!match) {
          push({ id: crypto.randomUUID(), role: "bot", text: "Hmm, I couldn't find that destination. Try one of: Japan, Thailand, UAE, Italy, USA…" });
          return;
        }
        setCountry(match.code);
        setStep("days");
        push({ id: crypto.randomUUID(), role: "bot", text: `${match.flag} ${match.name} — beautiful choice! How many days will you stay?` });
      } else if (step === "days") {
        const d = parseInt(text.replace(/\D/g, ""), 10);
        if (!d || d <= 0) {
          push({ id: crypto.randomUUID(), role: "bot", text: "Please share the number of days, e.g. 7." });
          return;
        }
        setDays(d);
        setStep("usage");
        push({ id: crypto.randomUUID(), role: "bot", text: "Got it. Will you use data lightly (maps + messaging), medium (social + streaming), or heavily (video calls + tethering)?" });
      } else if (step === "usage") {
        const t = text.toLowerCase();
        const usage: "light" | "medium" | "heavy" = t.includes("heav") ? "heavy" : t.includes("med") ? "medium" : "light";
        recommend(usage);
      } else {
        push({ id: crypto.randomUUID(), role: "bot", text: "Need anything else? Tap restart to try a new trip." });
      }
    }, 500);
  };

  const recommend = (usage: "light" | "medium" | "heavy") => {
    if (!country || !days) return;
    const dailyGb = usage === "light" ? 0.3 : usage === "medium" ? 1 : 2.5;
    const need = dailyGb * days;
    const pool = plans.filter((p) => p.countryCode === country);
    const sorted = [...pool].sort((a, b) => {
      const af = a.dataGb >= need ? 0 : 1;
      const bf = b.dataGb >= need ? 0 : 1;
      if (af !== bf) return af - bf;
      return a.price - b.price;
    });
    const recs = sorted.slice(0, 3);
    const cheapestStandalone = Math.min(...pool.map((p) => p.price));
    const roamingCost = Math.round(days * 12);
    push({
      id: crypto.randomUUID(),
      role: "bot",
      text: `Based on ${days} days of ${usage} usage, you'll use about ${need.toFixed(1)}GB. Here are my top picks:`,
    });
    setTimeout(() => {
      push({
        id: crypto.randomUUID(),
        role: "bot",
        recs,
        estimate: `${need.toFixed(1)}GB estimated`,
        savings: `Save ~$${Math.max(0, roamingCost - cheapestStandalone)} vs roaming`,
      });
      setStep("done");
    }, 600);
  };

  const quickReplies =
    step === "country" ? ["Japan", "Thailand", "UAE", "Italy"] :
    step === "days" ? ["3", "7", "14", "30"] :
    step === "usage" ? ["Light", "Medium", "Heavy"] : [];

  return (
    <Section>
      <SectionHeader eyebrow="AI Assistant" title="Find your perfect eSIM" subtitle="Answer 3 quick questions. Get personalized recommendations." />

      <Card className="mx-auto max-w-2xl overflow-hidden glass">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">anytimeEsim AI</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Online
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="mr-1 h-3.5 w-3.5" /> Restart</Button>
        </div>

        <div ref={scrollRef} className="h-[460px] space-y-4 overflow-y-auto p-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "bot" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                  {"text" in m && <p className="whitespace-pre-wrap">{m.text}</p>}
                  {"recs" in m && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">{m.estimate} · {m.savings}</span>
                      </div>
                      <div className="grid gap-3">
                        {m.recs.map((p, i) => <PlanCard key={p.id} plan={p} index={i} />)}
                      </div>
                    </div>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <User2 className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t p-3">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2 border-t p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer…"
            className="flex-1 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button type="submit" size="icon" className="bg-gradient-primary text-primary-foreground"><Send className="h-4 w-4" /></Button>
        </form>
      </Card>
    </Section>
  );
}