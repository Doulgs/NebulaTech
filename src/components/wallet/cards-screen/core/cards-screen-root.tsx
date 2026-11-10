import { BackTitle, Page } from "@/components/layout/screen";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useWallet } from "@/hooks/use-wallet";
import { useState } from "react";
import { WalletAccounts } from "../parts/wallet-accounts";
import { WalletCards } from "../parts/wallet-cards";
import { WalletInvoice } from "../parts/wallet-invoice";
import { WalletPayment } from "../parts/wallet-payment";

export default function CardsScreenRoot() {
  const model = useWallet();
  const [section, setSection] = useState<"cards" | "accounts">("cards");
  return (
    <Page
      header={
        <BackTitle
          title="Carteira"
          subtitle="Acompanhe seus cartões e saldos."
        />
      }
    >
      <SegmentedControl
        label="Seções da carteira"
        value={section}
        onChange={setSection}
        options={[
          { value: "cards", label: "Cartões" },
          { value: "accounts", label: "Contas" },
        ]}
      />
      {section === "cards" ? (
        <>
          <WalletCards model={model} />
          <WalletInvoice model={model} />
          <WalletPayment model={model} />
        </>
      ) : (
        <WalletAccounts model={model} />
      )}
    </Page>
  );
}
