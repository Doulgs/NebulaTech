import { useFinance } from "@/hooks/use-finance";
import { money } from "@/utils/finance";

import { NumberText } from "./text";
export function Amount({ value, size = 24 }: { value: number; size?: number }) {
  const { data } = useFinance();
  return (
    <NumberText size={size}>
      {data.hide ? "R$ ••••••" : money(value)}
    </NumberText>
  );
}
