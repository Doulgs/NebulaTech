import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { TransactionRow } from "@/components/ui/transaction-row";
import { seed } from "@/mock";
import { shortDate, signedMoney } from "@/utils/finance";
import { View } from "react-native";

import { useHistory } from "@/hooks/use-history";

export function HistoryGroups({
  model,
}: {
  model: ReturnType<typeof useHistory>;
}) {
  const { data, filtered, dates } = model;
  return (
    <>
      {dates.map((date) => (
        <View key={date} className="gap-[7px]">
          <Row className="justify-between pb-[3px]">
            <T size={12} bold muted>
              {date > seed.today
                ? "Agendado · "
                : date === seed.today
                  ? "Hoje · "
                  : ""}
              {shortDate(date)}
            </T>
            <T muted size={11}>
              {data.hide
                ? "••••"
                : signedMoney(
                    filtered
                      .filter((t) => t.date === date)
                      .reduce((s, t) => s + t.amount, 0),
                  )}
            </T>
          </Row>
          {filtered
            .filter((t) => t.date === date)
            .map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
        </View>
      ))}
    </>
  );
}
