import { Amount } from "@/components/ui/amount";
import { Card, Row } from "@/components/ui/surface";
import { Section } from "@/components/ui/section";
import { T } from "@/components/ui/text";
import { seed } from "@/mock";
import { color } from "@/utils/finance";
import { View } from "react-native";

import { useWallet } from "@/hooks/use-wallet";

export function WalletAccounts({
  model,
}: {
  model: ReturnType<typeof useWallet>;
}) {
  const { sum } = model;
  return (
    <>
      <Card tone="orbital" className="gap-1">
        <T muted size={13}>
          Total nas contas
        </T>
        <Amount value={sum.balance} size={32} />
      </Card>
      <Section title="Suas contas" />
      <View className="gap-[12px]">
        {seed.accounts.map((a, i) => {
          const balance =
            a.bal +
            (i === 0
              ? sum.extra
                  .filter((t) => t.account === "Nebula Conta")
                  .reduce((s, t) => s + t.amount, 0)
              : 0);
          return (
            <Card key={a.name} className="p-[16px]">
              <Row>
                <View
                  className="w-[43px] h-[43px] rounded-[15px] items-center justify-center"
                  style={{ backgroundColor: color(a.h) + "33" }}
                >
                  <T bold size={20} style={{ color: color(a.h) }}>
                    {a.initial}
                  </T>
                </View>
                <View className="flex-1">
                  <T bold size={13}>
                    {a.name}
                  </T>
                  <T muted size={10}>
                    {a.type}
                  </T>
                </View>
                <Amount value={balance} size={15} />
              </Row>
            </Card>
          );
        })}
      </View>
      <T size={10} muted>
        Pagamentos e bloqueios são simulados e salvos neste dispositivo.
      </T>
    </>
  );
}
