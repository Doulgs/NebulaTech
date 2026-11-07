import { BackTitle, Page } from "@/components/layout/screen";
import { Empty } from "@/components/ui/state-views";
import { NumberText, T } from "@/components/ui/text";
import { Row } from "@/components/ui/surface";
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
        <BackTitle title="Histórico" subtitle="Cada movimento, uma história." />
      }
    >
      <HistoryFilters model={model} />
      <Row className="justify-between">
        <T muted size={11}>
          {filtered.length} transações
        </T>
        <NumberText size={14}>
          {data.hide
            ? "••••"
            : signedMoney(filtered.reduce((s, t) => s + t.amount, 0))}
        </NumberText>
      </Row>
      {!filtered.length && <Empty />}
      <HistoryGroups model={model} />
    </Page>
  );
}
