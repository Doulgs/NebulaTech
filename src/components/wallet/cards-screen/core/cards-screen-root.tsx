import { BackTitle, Page } from "@/components/layout/screen";
import { useWallet } from "@/hooks/use-wallet";
import { WalletAccounts } from "../parts/wallet-accounts";
import { WalletCards } from "../parts/wallet-cards";
import { WalletInvoice } from "../parts/wallet-invoice";
import { WalletPayment } from "../parts/wallet-payment";
export default function CardsScreenRoot() {
  const model = useWallet();
  return (
    <Page
      header={
        <BackTitle
          title="Carteira"
          subtitle="Cartões e contas, em um só lugar"
        />
      }
    >
      <WalletCards model={model} />
      <WalletInvoice model={model} />
      <WalletAccounts model={model} />
      <WalletPayment model={model} />
    </Page>
  );
}
