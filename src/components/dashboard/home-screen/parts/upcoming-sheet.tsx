import { FormPage } from "@/components/layout/form-page";
import { BackTitle } from "@/components/layout/screen";
import { T } from "@/components/ui/text";
import { TransactionRow } from "@/components/ui/transaction-row";
import { useFinance } from "@/hooks/use-finance";
import { seed } from "@/mock";

export function UpcomingSheet() {
  const { data } = useFinance();
  const upcoming = data.transactions
    .filter((tx) => tx.date > seed.today)
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <FormPage header={<BackTitle title="Próximos lançamentos" subtitle="Veja o que está agendado para sua família" />}>
      <T muted size={12}>
        Agendados na sua demonstração de outubro.
      </T>
      {upcoming.length ? (
        upcoming.map((tx) => <TransactionRow key={tx.id} tx={tx} replace />)
      ) : (
        <T>Nenhum lançamento agendado.</T>
      )}
    </FormPage>
  );
}
