import { SiteShell } from "@/components/site/SiteNav";
import { PropertyCard, PROPERTIES } from "@/components/site/PropertyCard";

export default function PropertiesPage() {
  const list = [...PROPERTIES, ...PROPERTIES.map((p) => ({ ...p, name: `${p.name} II` }))];
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <span className="chip-kinetic">Portfolio</span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Properties
        </h1>
        <p className="mt-3 max-w-xl text-foreground/70">
          Every development currently marketed by RealBiz.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PropertyCard key={p.name} {...p} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
