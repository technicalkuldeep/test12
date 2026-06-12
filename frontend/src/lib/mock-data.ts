export type Region = "Asia" | "Europe" | "Americas" | "Middle East" | "Africa" | "Oceania";

export type Plan = {
  id: string;
  countryCode: string;
  country: string;
  flag: string;
  data: string; // "5GB" | "Unlimited"
  dataGb: number; // numeric for filtering (999 for unlimited)
  validityDays: number;
  price: number; // USD
  network: "4G" | "5G";
  quality: number; // 1-5
  carriers: string[];
  hotspot: boolean;
  popular?: boolean;
};

export type Country = {
  code: string;
  name: string;
  flag: string;
  region: Region;
  popularity: number; // 1-100
};

export const countries: Country[] = [
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia", popularity: 98 },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East", popularity: 92 },
  { code: "TH", name: "Thailand", flag: "🇹🇭", region: "Asia", popularity: 95 },
  { code: "US", name: "United States", flag: "🇺🇸", region: "Americas", popularity: 99 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe", popularity: 93 },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe", popularity: 91 },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe", popularity: 88 },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe", popularity: 87 },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe", popularity: 86 },
  { code: "TR", name: "Turkey", flag: "🇹🇷", region: "Europe", popularity: 84 },
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia", popularity: 90 },
  { code: "KR", name: "South Korea", flag: "🇰🇷", region: "Asia", popularity: 89 },
  { code: "CN", name: "China", flag: "🇨🇳", region: "Asia", popularity: 85 },
  { code: "IN", name: "India", flag: "🇮🇳", region: "Asia", popularity: 82 },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", region: "Asia", popularity: 80 },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", region: "Asia", popularity: 78 },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", region: "Asia", popularity: 77 },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania", popularity: 83 },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", region: "Oceania", popularity: 70 },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "Americas", popularity: 81 },
  { code: "MX", name: "Mexico", flag: "🇲🇽", region: "Americas", popularity: 76 },
  { code: "BR", name: "Brazil", flag: "🇧🇷", region: "Americas", popularity: 75 },
  { code: "AR", name: "Argentina", flag: "🇦🇷", region: "Americas", popularity: 65 },
  { code: "EG", name: "Egypt", flag: "🇪🇬", region: "Africa", popularity: 68 },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Africa", popularity: 66 },
  { code: "MA", name: "Morocco", flag: "🇲🇦", region: "Africa", popularity: 64 },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", region: "Middle East", popularity: 72 },
  { code: "QA", name: "Qatar", flag: "🇶🇦", region: "Middle East", popularity: 69 },
  { code: "PT", name: "Portugal", flag: "🇵🇹", region: "Europe", popularity: 73 },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", region: "Europe", popularity: 79 },
];

const carriersByCountry: Record<string, string[]> = {
  JP: ["NTT Docomo", "SoftBank"],
  AE: ["Etisalat", "du"],
  TH: ["AIS", "TrueMove H"],
  US: ["T-Mobile", "AT&T"],
  GB: ["EE", "Vodafone"],
  FR: ["Orange", "SFR"],
  IT: ["TIM", "Vodafone"],
  ES: ["Movistar", "Orange"],
  DE: ["Telekom", "Vodafone"],
  TR: ["Turkcell", "Vodafone"],
  SG: ["Singtel", "StarHub"],
  KR: ["SK Telecom", "KT"],
  CN: ["China Mobile", "China Unicom"],
  IN: ["Jio", "Airtel"],
  ID: ["Telkomsel", "XL"],
  VN: ["Viettel", "Vinaphone"],
  MY: ["Maxis", "Celcom"],
  AU: ["Telstra", "Optus"],
  NZ: ["Spark", "Vodafone"],
  CA: ["Rogers", "Bell"],
  MX: ["Telcel", "Movistar"],
  BR: ["Vivo", "Claro"],
  AR: ["Movistar", "Claro"],
  EG: ["Vodafone", "Orange"],
  ZA: ["MTN", "Vodacom"],
  MA: ["Maroc Telecom", "Orange"],
  SA: ["STC", "Mobily"],
  QA: ["Ooredoo", "Vodafone"],
  PT: ["MEO", "NOS"],
  NL: ["KPN", "Vodafone"],
};

type PlanSeed = { data: string; gb: number; days: number; price: number; network?: "4G" | "5G"; popular?: boolean };
const defaultTiers: PlanSeed[] = [
  { data: "1GB", gb: 1, days: 7, price: 4.5 },
  { data: "3GB", gb: 3, days: 7, price: 8 },
  { data: "5GB", gb: 5, days: 15, price: 13, popular: true },
  { data: "10GB", gb: 10, days: 30, price: 22, network: "5G" },
  { data: "20GB", gb: 20, days: 30, price: 35, network: "5G" },
  { data: "Unlimited", gb: 999, days: 15, price: 39, network: "5G", popular: true },
];

const overrides: Partial<Record<string, PlanSeed[]>> = {
  JP: [
    { data: "3GB", gb: 3, days: 7, price: 9 },
    { data: "10GB", gb: 10, days: 30, price: 19, network: "5G", popular: true },
    { data: "Unlimited", gb: 999, days: 15, price: 35, network: "5G" },
  ],
  AE: [
    { data: "5GB", gb: 5, days: 7, price: 14, popular: true },
    { data: "10GB", gb: 10, days: 30, price: 28, network: "5G" },
  ],
  TH: [
    { data: "5GB", gb: 5, days: 7, price: 11, popular: true },
    { data: "20GB", gb: 20, days: 30, price: 24, network: "5G" },
  ],
};

export const plans: Plan[] = countries.flatMap((c) => {
  const tiers = overrides[c.code] ?? defaultTiers;
  return tiers.map((t, i) => ({
    id: `${c.code}-${i}`,
    countryCode: c.code,
    country: c.name,
    flag: c.flag,
    data: t.data,
    dataGb: t.gb,
    validityDays: t.days,
    price: t.price,
    network: t.network ?? "4G",
    quality: t.network === "5G" ? 5 : 4,
    carriers: carriersByCountry[c.code] ?? ["Local Carrier"],
    hotspot: t.gb >= 5,
    popular: t.popular,
  }));
});

export const regions: Region[] = ["Asia", "Europe", "Americas", "Middle East", "Africa", "Oceania"];

export const getPlansByCountry = (code: string) => plans.filter((p) => p.countryCode === code);
export const getPlanById = (id: string) => plans.find((p) => p.id === id);
export const getCountryByCode = (code: string) => countries.find((c) => c.code === code);
export const getStartingPrice = (code: string) =>
  Math.min(...getPlansByCountry(code).map((p) => p.price));

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Nomad",
    avatar: "SC",
    text: "anytimeEsim saved my trip to Tokyo. Activated in 30 seconds and worked flawlessly across all of Japan.",
  },
  {
    name: "Marcus Weber",
    role: "Business Traveler",
    avatar: "MW",
    text: "I travel monthly between Dubai and London. Cheapest reliable eSIM I've found — and the AI assistant nailed my plan.",
  },
  {
    name: "Priya Sharma",
    role: "Travel Blogger",
    avatar: "PS",
    text: "Coverage in Thailand, Vietnam and Bali was perfect. WhatsApp checkout took under a minute.",
  },
];

export const faqs = [
  { q: "What is an eSIM?", a: "An eSIM is a digital SIM that lets you activate a mobile plan without a physical card. It's built into modern phones and downloads instantly." },
  { q: "Will my phone work with an eSIM?", a: "Most phones from 2018 onward support eSIM — iPhone XS and later, Google Pixel 3 and later, and most newer Samsung Galaxy and Huawei models." },
  { q: "How fast can I activate?", a: "Activation typically completes within 60 seconds of purchase. You'll receive a QR code by WhatsApp." },
  { q: "Do I keep my regular number?", a: "Yes. The eSIM runs as a second line so your home number stays active for SMS, calls and 2FA." },
  { q: "Can I tether or hotspot?", a: "Most plans support hotspot. Look for the hotspot indicator on the plan card." },
];

export const mockInquiries = [
  { id: 1, name: "Anna Kowalski", country: "Japan", plan: "10GB / 30 Days", time: "2m ago", status: "new" as const },
  { id: 2, name: "James O'Connor", country: "Thailand", plan: "Unlimited / 15 Days", time: "12m ago", status: "responded" as const },
  { id: 3, name: "Yuki Tanaka", country: "UAE", plan: "5GB / 7 Days", time: "1h ago", status: "purchased" as const },
  { id: 4, name: "Diego Hernandez", country: "Spain", plan: "10GB / 30 Days", time: "3h ago", status: "purchased" as const },
  { id: 5, name: "Mei Lin", country: "Singapore", plan: "5GB / 15 Days", time: "5h ago", status: "responded" as const },
  { id: 6, name: "Liam Murphy", country: "Italy", plan: "20GB / 30 Days", time: "Yesterday", status: "purchased" as const },
];

export const revenueData = [
  { day: "Mon", sales: 24, revenue: 480 },
  { day: "Tue", sales: 31, revenue: 612 },
  { day: "Wed", sales: 28, revenue: 540 },
  { day: "Thu", sales: 42, revenue: 880 },
  { day: "Fri", sales: 55, revenue: 1180 },
  { day: "Sat", sales: 67, revenue: 1410 },
  { day: "Sun", sales: 49, revenue: 990 },
];

export const WHATSAPP_NUMBER = "14784075950";

export function buildWhatsappUrl(plan: Plan): string {
  const msg = `Hello,\n\nI would like to purchase the following eSIM:\n\nCountry: ${plan.country}\nPlan: ${plan.data}\nValidity: ${plan.validityDays} Days\nPrice: $${plan.price}\n\nPlease assist me with the purchase.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}