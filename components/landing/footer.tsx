import Link from "next/link";
import { Building2 } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Demo", "Changelog"],
  Company: ["About", "Careers", "Blog", "Contact"],
  Resources: ["Help Center", "API Docs", "Community", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Security"],
};

export function Footer() {
  return (
    <footer className="border-t border-brand-ink/[0.07] bg-white px-5 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white">
                <Building2 size={17} strokeWidth={2.2} />
              </span>
              <span className="font-display text-[16px] font-semibold text-brand-ink">
                RealBiz
              </span>
            </Link>
            <p className="mt-3 max-w-55 text-[13px] leading-relaxed text-brand-ink/50">
              The all-in-one platform for modern real estate businesses.
            </p>
            <div className="mt-5 flex gap-3 text-brand-ink/40">
              <FaXTwitter size={15} className="hover:text-brand-blue transition-colors" />
              <FaLinkedinIn size={15} className="hover:text-brand-blue transition-colors" />
              <FaFacebookF size={15} className="hover:text-brand-blue transition-colors" />
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[12.5px] font-semibold text-brand-ink">{heading}</h4>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-brand-ink/55 transition-colors hover:text-brand-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-brand-ink/6 pt-6 text-center text-[12px] text-brand-ink/40">
          &copy; {new Date().getFullYear()} RealBiz Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
