import Animated, { FadeIn, ReduceMotion } from "react-native-reanimated";
import { FlowChart } from "@/components/dashboard/charts";
import { Card, Row } from "@/components/ui/surface";
import { Page } from "@/components/layout/screen";
import { Section } from "@/components/ui/section";
import { T } from "@/components/ui/text";
import { useDashboard } from "@/hooks/use-dashboard";
import { View } from "react-native";
import { BalancePanel } from "../parts/balance-panel";
import { CategoryPreview } from "../parts/category-preview";
import { HomeCalendar } from "../parts/home-calendar";
import { HomeHeader } from "../parts/home-header";
import { HomeShortcuts } from "../parts/home-shortcuts";
import { RecentActivity } from "../parts/recent-activity";
export default function HomeScreenRoot() {
  const model = useDashboard();
  return (
    <Page header={<HomeHeader model={model} />}>
      {model.calendar ? (
        <Animated.View
          entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
        >
          <Card>
            <Section title="Outubro 2026" />
            <HomeCalendar model={model} />
          </Card>
        </Animated.View>
      ) : (
        <BalancePanel model={model} />
      )}
      <HomeShortcuts />
      <CategoryPreview model={model} />
      <Card>
        <View className="gap-1">
          <Section title="Evolução do saldo" />
          <T size={12} muted>
            Seu caminho ao longo do mês
          </T>
        </View>
        <FlowChart />
        <Row className="justify-between">
          <T size={11} muted>
            01 out
          </T>
          <T size={11} muted>
            19 out
          </T>
        </Row>
        <T muted size={10}>
          Histórico de demonstração
        </T>
      </Card>
      <RecentActivity model={model} />
      <T muted size={11} className="text-center">
        Demonstração · 19 de outubro de 2026
      </T>
    </Page>
  );
}
