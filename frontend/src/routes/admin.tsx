import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Globe2,
  Package,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section } from "@/components/site/section";
import { countries, mockInquiries, revenueData, type Plan } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — anytimeEsim" }] }),
  component: AdminPage,
});

type PlanForm = Omit<Plan, "id">;
const blankForm: PlanForm = {
  countryCode: "JP",
  country: "Japan",
  flag: "🇯🇵",
  data: "5GB",
  dataGb: 5,
  validityDays: 15,
  price: 15,
  network: "5G",
  quality: 5,
  carriers: ["Local Carrier"],
  hotspot: true,
};

function AdminPage() {
  const navigate = useNavigate();

useEffect(() => {
  const auth = localStorage.getItem("admin-auth");

  if (auth !== "true") {
    navigate({ to: "/admin-login" });
  }
}, []);
  const { plans, addPlan, updatePlan, deletePlan } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [form, setForm] = useState<PlanForm>(blankForm);

  const countriesCovered = useMemo(() => new Set(plans.map((p) => p.countryCode)).size, [plans]);

  const filtered = useMemo(
    () =>
      plans.filter(
        (p) =>
          p.country.toLowerCase().includes(q.toLowerCase()) ||
          p.data.toLowerCase().includes(q.toLowerCase()),
      ),
    [plans, q],
  );

  const openCreate = () => { setEditing(null); setForm(blankForm); setOpen(true); };
  const openEdit = (p: Plan) => { setEditing(p); setForm({ ...p }); setOpen(true); };
  const save = () => {
    const c = countries.find((c) => c.code === form.countryCode);
    const payload = c ? { ...form, country: c.name, flag: c.flag } : form;
    if (editing) {
      updatePlan(editing.id, payload);
      toast.success("Plan updated");
    } else {
      addPlan(payload);
      toast.success("Plan added");
    }
    setOpen(false);
  };

  return (
    <Section className="!py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Prototype — actions update local state only.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="bg-gradient-primary text-primary-foreground"><Plus className="mr-1 h-4 w-4" /> Add plan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit plan" : "New plan"}</DialogTitle></DialogHeader>
            <div className="grid gap-3">
              <div>
                <Label>Country</Label>
                <Select value={form.countryCode} onValueChange={(v) => setForm({ ...form, countryCode: v })}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Data label</Label><Input className="mt-1.5" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} /></div>
                <div><Label>Data (GB)</Label><Input className="mt-1.5" type="number" value={form.dataGb} onChange={(e) => setForm({ ...form, dataGb: +e.target.value })} /></div>
                <div><Label>Validity (days)</Label><Input className="mt-1.5" type="number" value={form.validityDays} onChange={(e) => setForm({ ...form, validityDays: +e.target.value })} /></div>
                <div><Label>Price (USD)</Label><Input className="mt-1.5" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} /></div>
                <div>
                  <Label>Network</Label>
                  <Select value={form.network} onValueChange={(v: "4G" | "5G") => setForm({ ...form, network: v })}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4G">4G</SelectItem>
                      <SelectItem value="5G">5G</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Quality (1-5)</Label><Input className="mt-1.5" type="number" min={1} max={5} value={form.quality} onChange={(e) => setForm({ ...form, quality: +e.target.value })} /></div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={save} className="bg-gradient-primary text-primary-foreground">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Package, label: "Total plans", value: plans.length },
          { icon: Globe2, label: "Countries covered", value: countriesCovered },
          { icon: ShoppingBag, label: "Recent purchases", value: 49 },
          { icon: MessageSquare, label: "Inquiries", value: mockInquiries.length },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 text-3xl font-bold tracking-tight">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Revenue this week</h3>
            <Badge variant="outline">+18.2%</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={revenueData}>
                <CartesianGrid strokeOpacity={0.08} />
                <XAxis dataKey="day" stroke="currentColor" fontSize={12} />
                <YAxis stroke="currentColor" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Plans sold per day</h3>
            <Badge variant="outline">{revenueData.reduce((a, b) => a + b.sales, 0)} total</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <CartesianGrid strokeOpacity={0.08} />
                <XAxis dataKey="day" stroke="currentColor" fontSize={12} />
                <YAxis stroke="currentColor" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="sales" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Plan management</h3>
            <div className="flex items-center gap-2 rounded-md border bg-card/40 px-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search plans" className="h-8 w-48 border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3">Country</th>
                  <th className="py-2 pr-3">Plan</th>
                  <th className="py-2 pr-3">Validity</th>
                  <th className="py-2 pr-3">Price</th>
                  <th className="py-2 pr-3">Network</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 12).map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 pr-3">{p.flag} {p.country}</td>
                    <td className="py-3 pr-3">{p.data}</td>
                    <td className="py-3 pr-3">{p.validityDays}d</td>
                    <td className="py-3 pr-3 font-medium">${p.price}</td>
                    <td className="py-3 pr-3"><Badge variant="outline">{p.network}</Badge></td>
                    <td className="py-3">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => { deletePlan(p.id); toast.success("Plan deleted"); }}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No plans found.</p>}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Recent inquiries</h3>
          <ul className="space-y-3">
            {mockInquiries.map((i) => (
              <li key={i.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium">{i.name}</div>
                  <div className="text-xs text-muted-foreground">{i.country} · {i.plan}</div>
                </div>
                <div className="text-right">
                  <Badge variant={i.status === "purchased" ? "default" : "outline"} className={i.status === "purchased" ? "bg-primary text-primary-foreground" : ""}>{i.status}</Badge>
                  <div className="mt-1 text-xs text-muted-foreground">{i.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}