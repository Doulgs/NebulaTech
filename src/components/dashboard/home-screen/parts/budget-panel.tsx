import { View, useWindowDimensions } from "react-native";
import { seed } from "@/mock";
import { money } from "@/utils/finance";
import { NumberText, T } from "@/components/ui/text";
import { Progress } from "@/components/ui/progress";
import { Row } from "@/components/ui/surface";
import { Ring } from "@/components/dashboard/charts";
import { useDashboard } from "@/hooks/use-dashboard";

export function BudgetPanel({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { data, sum } = model;
  const { width } = useWindowDimensions();
  const remaining = seed.summary.budget - sum.expense;
  const today = new Date(`${seed.today}T12:00:00`);
  const daysLeft =
    new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() -
    today.getDate();
  return (
    <Row className="items-center gap-3 pt-1">
      <Ring value={sum.expense / seed.summary.budget} size={56} />
      <View className="flex-1 gap-1.5">
        <T muted size={11}>
          Orçamento mensal
        </T>
        <NumberText size={14}>
          {data.hide
            ? "••••"
            : `${remaining < 0 ? "Excede" : "Restam"} ${money(Math.abs(remaining))}`}
        </NumberText>
        <Progress value={sum.expense / seed.summary.budget} />
      </View>
      {width >= 360 && (
        <View className="w-[83px] gap-1.5">
          <T size={11} muted>
            Fim do mês
          </T>
          <NumberText size={14}>{daysLeft} dias</NumberText>
          <Progress
            value={today.getDate() / (today.getDate() + daysLeft)}
            tint="#D3CEDC"
          />
        </View>
      )}
    </Row>
  );
}
