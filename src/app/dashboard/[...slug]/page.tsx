import { ModulePage } from "@/components/dashboard/ModulePage";
import { RouteBreadcrumb } from "@/components/ui/RouteBreadcrumb";
import { isModuleKey } from "@/lib/menus";

export default async function DashboardSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const routeSlug = Array.isArray(slug) ? slug.join("/") : "";
  const [first = "", ...rest] = routeSlug.split("/").filter(Boolean);
  const moduleKey = isModuleKey(first) ? first : "project";
  return (
    <>
      <RouteBreadcrumb />
      <ModulePage module={moduleKey} path={rest.join("/")} />
    </>
  );
}
