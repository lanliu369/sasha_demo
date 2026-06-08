import { notFound, redirect } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageRouter } from "@/components/pages/PageRouter";
import { findRouteByPath, legacyRedirects } from "@/lib/navigation";

type SubSectionPageProps = {
  params: Promise<{ section: string; subsection: string }>;
};

export default async function SubSectionPage({ params }: SubSectionPageProps) {
  const { section, subsection } = await params;
  const path = `/${section}/${subsection}`;

  if (legacyRedirects[path]) {
    redirect(legacyRedirects[path]);
  }

  const route = findRouteByPath(path);

  if (!route) {
    notFound();
  }

  return (
    <AppLayout title={route.label}>
      <PageRouter
        path={path}
        title={route.label}
        description={route.description}
        sectionLabel={route.sectionLabel}
      />
    </AppLayout>
  );
}
