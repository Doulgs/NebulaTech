import { Amount } from "@/components/ui/amount";
import { Icon } from "@/components/ui/icon";
import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { PressScale } from "@/components/ui/press-scale";
import { palette } from "@/theme/colors";
import { Gradient } from "@/components/ui/gradient";
import { useDashboard } from "@/hooks/use-dashboard";
import { router } from "expo-router";
import { View, useWindowDimensions } from "react-native";
import { BudgetPanel } from "./budget-panel";
export function BalancePanel({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { data, sum, togglePrivacy } = model;
  const { width } = useWindowDimensions();
  return (
    <Gradient
      colors={["#2B203F", "#21192F", "#16121F"]}
      locations={[0, 0.45, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      className="overflow-hidden rounded-[24px] border border-[#BB9AE5]/20 p-5"
      style={{ boxShadow: "inset 0 1px 0 #E4CFFF12, 0 10px 24px #00000020" }}
    >
      <T bold size={13} className="mb-5 text-center">
        Outubro 2026
      </T>
      <Row className="mb-2 justify-between">
        <Row className="gap-1">
          <T muted size={13}>
            Saldo total
          </T>
          <PressScale
            accessibilityLabel={
              data.hide ? "Mostrar valores" : "Ocultar valores"
            }
            onPress={togglePrivacy}
            className="h-11 w-11 items-center justify-center"
          >
            <View className="h-7 w-7 items-center justify-center rounded-full bg-white/[0.07]">
              <Icon
                name={data.hide ? "hidden" : "eye"}
                size={15}
                tint="#C1B2D3"
              />
            </View>
          </PressScale>
        </Row>
        <PressScale
          accessibilityLabel="Ver 3 contas"
          onPress={() => router.replace("/cards")}
          className="min-h-11 justify-center"
        >
          <View className="rounded-full bg-white/[0.06] px-3 py-1.5">
            <T muted size={11}>
              3 contas
            </T>
          </View>
        </PressScale>
      </Row>
      <View className="mb-5">
        <Amount
          value={sum.balance}
          size={width < 340 ? 28 : width < 375 ? 32 : 38}
        />
      </View>
      <Row className="items-start gap-4">
        <View className="flex-1 gap-2">
          <Row className="gap-1.5">
            <View className="h-5 w-5 items-center justify-center rounded-full bg-nebula-green/15">
              <Icon name="in" size={12} tint={palette.green} />
            </View>
            <T size={12} muted>
              Receitas
            </T>
          </Row>
          <Amount value={sum.income} size={width < 360 ? 15 : 18} />
        </View>
        <View className="flex-1 gap-2">
          <Row className="gap-1.5">
            <View className="h-5 w-5 items-center justify-center rounded-full bg-nebula-red/15">
              <Icon name="out" size={12} tint={palette.red} />
            </View>
            <T size={12} muted>
              Despesas
            </T>
          </Row>
          <Amount value={sum.expense} size={width < 360 ? 15 : 18} />
        </View>
      </Row>
      <View className="my-5 h-px bg-white/[0.09]" />
      <BudgetPanel model={model} />
    </Gradient>
  );
}
