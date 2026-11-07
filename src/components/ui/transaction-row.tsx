import { useFinance } from "@/hooks/use-finance";
import { seed } from "@/mock";
import type { Transaction } from "@/types";
import { color, shortDate, signedMoney } from "@/utils/finance";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { Icon } from "./icon";
import { NumberText, T } from "./text";
export function TransactionRow({
  tx,
  replace,
}: {
  tx: Transaction;
  replace?: boolean;
}) {
  const { data } = useFinance();
  const cat = data.categories[tx.cat],
    member = seed.members.find((m) => m.id === tx.member);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${tx.name}, ${data.hide ? "valor oculto" : signedMoney(tx.amount)}`}
      onPress={() => {
        const navigate = replace ? router.replace : router.push;
        navigate({ pathname: "/transaction/[id]", params: { id: tx.id } });
      }}
      className="flex-row items-center gap-3 rounded-[15px] border-b border-nebula-border px-0.5 py-4 active:bg-[#261C34]"
    >
      <View
        className="h-[43px] w-[43px] items-center justify-center rounded-[15px]"
        style={{ backgroundColor: color(cat?.h || 295) + "1A" }}
      >
        <Icon path={cat?.icon} tint={color(cat?.h || 295)} />
      </View>
      <View className="flex-1 gap-0.5">
        <T bold size={14} className="shrink">
          {tx.name}
        </T>
        <T muted size={11}>
          {member?.first} · {cat?.label} · {shortDate(tx.date)}
        </T>
        {!!tx.recur && (
          <T size={9} className="text-nebula-purple">
            ↻{" "}
            {tx.recur === "month"
              ? "Mensal"
              : tx.recur === "week"
                ? "Semanal"
                : "Anual"}
            {tx.recurTotal ? ` ${tx.recurIdx}/${tx.recurTotal}` : ""}
          </T>
        )}
      </View>
      <View className="shrink items-end gap-[3px]">
        <NumberText
          size={14}
          className={tx.amount > 0 ? "text-nebula-green" : "text-nebula-text"}
        >
          {data.hide ? "••••" : signedMoney(tx.amount)}
        </NumberText>
        {tx.date > seed.today && (
          <T size={9} className="text-[#F0D190]">
            Agendada
          </T>
        )}
      </View>
    </Pressable>
  );
}
