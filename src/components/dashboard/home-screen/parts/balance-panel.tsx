import { Amount } from "@/components/ui/amount";
import { Gradient } from "@/components/ui/gradient";
import { Icon } from "@/components/ui/icon";
import { Card, Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import type { useDashboard } from "@/hooks/use-dashboard";
import { palette } from "@/theme/colors";
import { Image } from "expo-image";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { BudgetPanel } from "./budget-panel";

const metrics = [
  { key: "income", label: "Entradas", icon: "in", tint: palette.green },
  { key: "expense", label: "Saídas", icon: "out", tint: palette.red },
] as const;

export function BalancePanel({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { sum } = model;
  const { width } = useWindowDimensions();

  return (
    <View className="gap-3">
      <Card className="overflow-hidden bg-nebula-heroBase px-5 py-4">
        <Image
          source={require("../../../../../assets/images/andromeda-galaxy.jpg")}
          contentFit="cover"
          contentPosition={{ top: "42%" }}
          style={StyleSheet.absoluteFill}
          accessible={false}
        />
        <Gradient
          pointerEvents="none"
          colors={["transparent", palette.bg]}
          start={{ x: 0.6, y: 0.22 }}
          end={{ x: 0.35, y: 1 }}
          className="absolute inset-0"
        />
        <View className="gap-1">
          <T size={14} bold>
            Saldo total
          </T>
          <Amount value={sum.balance} size={width < 360 ? 32 : 38} />
          <T muted size={12}>
            Saldo consolidado das suas contas
          </T>
        </View>
      </Card>
      <Row className="items-stretch gap-3">
        {metrics.map((metric) => (
          <Card key={metric.key} className="flex-1 gap-2.5">
            <Row className="gap-2">
              <View className="h-7 w-7 items-center justify-center rounded-full bg-nebula-raised">
                <Icon name={metric.icon} size={15} tint={metric.tint} />
              </View>
              <T size={13} muted>
                {metric.label}
              </T>
            </Row>
            <Amount value={sum[metric.key]} size={width < 360 ? 15 : 18} />
          </Card>
        ))}
      </Row>
      <Card>
        <BudgetPanel model={model} />
      </Card>
    </View>
  );
}
