import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/mock-data";

export function FloatingWhatsapp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi anytimeEsim team, I need help choosing an eSIM.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  );
}