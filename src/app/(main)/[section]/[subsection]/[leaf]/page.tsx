import { notFound, redirect } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageRouter } from "@/components/pages/PageRouter";
import { findRouteByPath, legacyRedirects } from "@/lib/navigation";

type LeafPageProps = {
  params: Promise<{ section: string; subsection: string; leaf: string }>;
};

export default async function LeafPage({ params }: LeafPageProps) {
  const { section, subsection, leaf } = await params;
  const path = `/${section}/${subsection}/${leaf}`;

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
