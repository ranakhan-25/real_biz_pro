import { Mail, MessageSquare, Phone, Calendar, FileSpreadsheet } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

const INTEGRATIONS = [
  { name: "Email", icon: Mail, color: "bg-brand-blue-soft text-brand-blue" },
  { name: "SMS Gateway", icon: MessageSquare, color: "bg-brand-teal-soft text-brand-teal" },
  { name: "Facebook Lead Ads", icon: FaFacebook, color: "bg-brand-violet-soft text-brand-violet" },
  { name: "Call Center / IVR", icon: Phone, color: "bg-brand-amber-soft text-brand-amber" },
  { name: "Google Calendar", icon: Calendar, color: "bg-brand-blue-soft text-brand-blue" },
  { name: "Spreadsheet Import", icon: FileSpreadsheet, color: "bg-brand-teal-soft text-brand-teal" },
];

export function Integrations() {
  return (
    <section id="integrations" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <span className="font-mono-accent text-[11.5px] font-semibold tracking-wider text-brand-teal">
              INTEGRATIONS
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
              Connects with the tools you already use
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/60">
              Leads from Facebook ads land directly in your pipeline. Follow-up
              reminders sync to your calendar. Bulk SMS and email go out
              without leaving RealBiz. No manual copy-pasting between tools,
              and no lead ever sits in an inbox unnoticed.
            </p>
            <ul className="mt-6 space-y-2.5 text-[13.5px] text-brand-ink/60">
              <li>&bull; Import your existing spreadsheet in one step</li>
              <li>&bull; Auto-capture leads from Facebook Lead Ads forms</li>
              <li>&bull; Two-way sync with your team&apos;s calendar</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {INTEGRATIONS.map((integration) => (
              <div
                key={integration.name}
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-brand-ink/[0.07] bg-white p-5 text-center transition-transform hover:-translate-y-1"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${integration.color}`}
                >
                  <integration.icon size={19} />
                </span>
                <span className="text-[12px] font-medium text-brand-ink/70">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
