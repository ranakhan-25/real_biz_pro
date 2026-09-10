import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/realbiz-logo.png";

export function Logo({
  to = "/",
  compact = false,
}: {
  to?: "/" | "/dashboard";
  compact?: boolean;
}) {
  return (
    <Link href={to} className="flex items-center" aria-label="RealBiz home">
      <Image
        src={logo}
        alt="RealBiz logo"
        width={512}
        height={512}
        className="h-20 w-20 object-contain"
      />
      {/* {!compact && (
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          RealBiz
        </span>
      )} */}
    </Link>
  );
}
