import { RouteSheet } from "@/components/layout/sheets";
import { useFinance } from "@/hooks/use-finance";
import { Redirect } from "expo-router";
import { type ReactNode } from "react";
export function FormPage({
  children,
  header,
}: {
  children: ReactNode;
  header?: ReactNode;
}) {
  const { data } = useFinance();
  if (!data.session) return <Redirect href="/" />;
  return <RouteSheet header={header}>{children}</RouteSheet>;
}
