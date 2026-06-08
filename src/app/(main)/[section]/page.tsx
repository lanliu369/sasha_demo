import { notFound, redirect } from "next/navigation";
import { menuTree } from "@/lib/mock/menu";
import { getFirstChildPath } from "@/lib/navigation";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const item = menuTree.find((menu) => menu.key === section);

  if (!item) {
    notFound();
  }

  const path = getFirstChildPath(item);
  if (path) {
    redirect(path);
  }

  notFound();
}
