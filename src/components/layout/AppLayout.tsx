import { AppShell } from "./AppShell";

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function AppLayout({ children, title }: AppLayoutProps) {
  return <AppShell title={title}>{children}</AppShell>;
}
