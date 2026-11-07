import { Amount } from "@/components/ui/amount";
import { Button } from "@/components/ui/button";
import { Card, Row } from "@/components/ui/surface";
import { Progress } from "@/components/ui/progress";
import { Section } from "@/components/ui/section";
import { T } from "@/components/ui/text";
import { View } from "react-native";

import { useWallet } from "@/hooks/use-wallet";

export function WalletInvoice({
  model,
}: {
  model: ReturnType<typeof useWallet>;
}) {
  const { data, save, confirm, setConfirm, card, used } = model;
  return (
    <>
      <Card>
        <Section title="Fatura atual" />
        <Amount value={used} size={32} />
        <T muted size={12}>
          {used ? "Vencimento em " + card.due : "Fatura paga na demonstração"}
        </T>
        <Row className="justify-between">
          <T muted size={11}>
            Limite utilizado
          </T>
          <T size={11}>{((used / card.limit) * 100).toFixed(1)}%</T>
        </Row>
        <Progress value={used / card.limit} />
        <Row className="justify-between">
          <View className="gap-[5px]">
            <T size={10} muted>
              Disponível
            </T>
            <Amount value={card.limit - used} size={16} />
          </View>
          <View className="gap-[5px] items-end">
            <T size={10} muted>
              Limite total
            </T>
            <Amount value={card.limit} size={16} />
          </View>
        </Row>
        <Row className="justify-between">
          <T size={10} muted>
            Fecha em {card.closing}
          </T>
          <T size={10} muted>
            Melhor compra: {card.best}
          </T>
        </Row>
        <Row>
          <View className="flex-1">
            <Button disabled={!used} onPress={() => setConfirm(!confirm)}>
              {used ? "Pagar fatura" : "Fatura paga"}
            </Button>
          </View>
          <View className="flex-1">
            <Button
              secondary
              icon={data.locked[card.name] ? "unlock" : "lock"}
              onPress={() => {
                save((d) => ({
                  ...d,
                  locked: { ...d.locked, [card.name]: !d.locked[card.name] },
                })).catch(() => {});
              }}
            >
              {data.locked[card.name] ? "Desbloquear" : "Bloquear"}
            </Button>
          </View>
        </Row>
      </Card>
    </>
  );
}
