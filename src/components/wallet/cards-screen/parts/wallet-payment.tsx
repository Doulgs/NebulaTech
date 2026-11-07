import { ActionSheet } from "@/components/layout/sheets";
import { BackTitle } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { ErrorText } from "@/components/ui/state-views";
import { T } from "@/components/ui/text";
import { money } from "@/utils/finance";

import { useWallet } from "@/hooks/use-wallet";

export function WalletPayment({
  model,
}: {
  model: ReturnType<typeof useWallet>;
}) {
  const { confirm, setConfirm, busy, error, card, used, pay } = model;
  return (
    <>
      <ActionSheet
        open={confirm}
        onClose={() => setConfirm(false)}
        header={
          <BackTitle
            title="Pagar fatura"
            subtitle={card.name}
            onBack={() => setConfirm(false)}
          />
        }
      >
        <T size={14}>
          Confirmar o pagamento local de {money(used)} usando a Nebula Conta?
        </T>
        <ErrorText text={error} />
        <Button disabled={busy} onPress={pay}>
          {busy ? "Salvando…" : "Confirmar pagamento · demo"}
        </Button>
        <Button secondary onPress={() => setConfirm(false)}>
          Cancelar
        </Button>
      </ActionSheet>
    </>
  );
}
