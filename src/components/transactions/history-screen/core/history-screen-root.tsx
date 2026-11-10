import { IconButton } from "@/components/ui/button";
import { router } from "expo-router";
import { BackTitle, Page } from "@/components/layout/screen";
import { Empty } from "@/components/ui/state-views";
import { NumberText, T } from "@/components/ui/text";
import { Card, Row } from "@/components/ui/surface";
import { useHistory } from "@/hooks/use-history";
import { signedMoney } from "@/utils/finance";
import { HistoryFilters } from "../parts/history-filters";
import { HistoryGroups } from "../parts/history-groups";
export default function History() {
  const model = useHistory();
  const { data, filtered } = model;
  return (
    <Page
      header={
        <BackTitle
          title="Atividades"
          subtitle="Acompanhe entradas, saídas e transferências."
          action={
            <IconButton
              name="plus"
              label="Nova transação"
              active
              onPress={() => router.push("/add")}
            />
          }
        />
      }
    >
      <HistoryFilters model={model} />
      <Card tone="orbital" className="gap-1 py-3.5">
        <T muted size={12}>
          Saldo das atividades exibidas
        </T>
        <Row className="justify-between">
          <T muted size={11}>
            {filtered.length} transações
          </T>
          <NumberText size={19}>
            {data.hide
              ? "••••"
              : signedMoney(filtered.reduce((s, t) => s + t.amount, 0))}
          </NumberText>
        </Row>
      </Card>
      {!filtered.length && (
        <Empty
          text="Nenhuma atividade encontrada."
          detail="Ajuste os filtros ou tente outro termo de busca."
        />
      )}
      <HistoryGroups model={model} />
    </Page>
  );
}
