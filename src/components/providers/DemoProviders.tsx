"use client";

import type { ReactNode } from "react";
import { TrainingDemoProvider } from "@/lib/demo/trainingStore";

type DemoProvidersProps = {
  children: ReactNode;
};

export function DemoProviders({ children }: DemoProvidersProps) {
  return <TrainingDemoProvider>{children}</TrainingDemoProvider>;
}
