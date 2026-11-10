import { FormPage } from "@/components/layout/form-page";
import { closeSheetRoute } from "@/components/layout/navigation";
import { BackTitle } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Card, Row } from "@/components/ui/surface";
import { Empty, ErrorText } from "@/components/ui/state-views";
import { Icon } from "@/components/ui/icon";
import { NumberText, T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { seed } from "@/mock";
import { cn } from "@/theme/classes";
import { color, recurrenceLabels, signedMoney } from "@/utils/finance";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Share, View } from "react-native";
export function TransactionDetail() {
  const { data } = useFinance();
  const { id } = useLocalSearchParams<{ id: string }>();
  const tx = data.transactions.find((t) => t.id === Number(id));
  const [error, setError] = useState("");
  if (!tx)
    return (
      <FormPage header={<BackTitle title="Transação" />}>
        <Empty text="Este lançamento não foi encontrado." />
      </FormPage>
    );
  const cat = data.categories[tx.cat],
    member = seed.members.find((m) => m.id === tx.member);
  const rows = [
    ["Lançado por", member?.name || "—"],
    ["Categoria", cat?.label || "Outros"],
    [
      "Recorrência",
      tx.recur
        ? recurrenceLabels[tx.recur] +
          (tx.recurTotal ? ` ${tx.recurIdx}/${tx.recurTotal}` : "")
        : "Única",
    ],
    ["Conta", tx.account],
    ["Data", new Date(tx.date + "T12:00").toLocaleDateString("pt-BR")],
    ["Horário", tx.time],
    ["Código", "NB" + String(tx.id * 7919).padStart(8, "0")],
  ];
  async function share() {
    if (!tx) return;
    try {
      await Share.share({
        title: "Comprovante Andromeda · demonstração",
        message: `Comprovante de demonstração Andromeda\n${tx.name}\n${signedMoney(tx.amount)}\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\nSem validade bancária.`,
      });
    } catch {
      setError("Não foi possível compartilhar. Tente novamente.");
    }
  }
  return (
    <FormPage
      header={
        <BackTitle
          title="Detalhes"
          subtitle="Informações e comprovante da transação"
        />
      }
    >
      <Card tone="orbital" className="items-center gap-3 py-5">
        <View
          className="w-[64px] h-[64px] rounded-[22px] items-center justify-center"
          style={{ backgroundColor: color(cat.h) + "22" }}
        >
          <Icon path={cat.icon} tint={color(cat.h)} size={30} />
        </View>
        <T bold size={22}>
          {tx.name}
        </T>
        <NumberText
          size={32}
          className={cn(
            "",
            tx.amount > 0 ? "text-nebula-green" : "text-nebula-text",
          )}
        >
          {data.hide ? "••••" : signedMoney(tx.amount)}
        </NumberText>
        <T
          size={12}
          className={cn(
            "",
            tx.date > seed.today ? "text-[#F0D190]" : "text-nebula-green",
          )}
        >
          {tx.date > seed.today ? "Agendada" : "Concluída"}
        </T>
      </Card>
      <Card>
        {rows.map(([k, v]) => (
          <Row key={k} className="justify-between">
            <T size={12} muted>
              {k}
            </T>
            <T size={12} selectable className="shrink text-right">
              {v}
            </T>
          </Row>
        ))}
      </Card>
      <ErrorText text={error} />
      <Button onPress={share}>Compartilhar comprovante · demo</Button>
      <Button secondary onPress={() => closeSheetRoute()}>
        Fechar
      </Button>
    </FormPage>
  );
}
