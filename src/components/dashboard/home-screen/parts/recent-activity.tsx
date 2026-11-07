import { Chip, Chips } from "@/components/ui/chip";
import { Empty } from "@/components/ui/state-views";
import { Section } from "@/components/ui/section";
import { TransactionRow } from "@/components/ui/transaction-row";
import { useDashboard } from "@/hooks/use-dashboard";
import { router } from "expo-router";
import { View } from "react-native";
export function RecentActivity({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { items, filter, setFilter } = model;
  return (
    <View className="gap-4">
      <Section
        title="Últimos movimentos"
        action="Ver tudo"
        onPress={() => router.replace("/history")}
      />
      <Chips>
        {[
          ["all", "Todas"],
          ["in", "↙ Entradas"],
          ["out", "↗ Saídas"],
          ["tr", "⇄ Transferências"],
        ].map(([id, label]) => (
          <Chip
            key={id}
            label={label}
            active={filter === id}
            onPress={() => setFilter(id)}
          />
        ))}
      </Chips>
      <View>
        {items.length ? (
          items.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
        ) : (
          <Empty />
        )}
      </View>
    </View>
  );
}
