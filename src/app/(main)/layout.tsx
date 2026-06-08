import { DemoProviders } from "@/components/providers/DemoProviders";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoProviders>{children}</DemoProviders>;
}
