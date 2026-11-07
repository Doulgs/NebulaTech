import { T } from "@/components/ui/text";
import { TransactionRow } from "@/components/ui/transaction-row";
import { useDashboard } from "@/hooks/use-dashboard";
import { Pressable, View } from "react-native";
export function HomeCalendar({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { data, days, day, setDay, dayItems } = model;
  return (
    <View className="gap-4">
      <View className="flex-row flex-wrap">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((w, i) => (
          <View key={i} className="w-[14.285%] items-center pb-[8px]">
            <T size={11} muted>
              {w}
            </T>
          </View>
        ))}
        {days.map((d, i) => (
          <Pressable
            key={i}
            disabled={!d}
            accessibilityRole="button"
            accessibilityLabel={`${d} de outubro`}
            onPress={() => setDay(d)}
            className="w-[14.285%] h-[43px] p-[2px]"
          >
            <View
              className="flex-1 rounded-[10px] items-center justify-center gap-[3px]"
              style={{
                backgroundColor:
                  day === d
                    ? "#664595"
                    : data.transactions.some(
                          (t) =>
                            t.date === `2026-10-${String(d).padStart(2, "0")}`,
                        )
                      ? "#FFFFFF0A"
                      : "transparent",
              }}
            >
              <T size={12} muted={d > 19}>
                {d || ""}
              </T>
              {data.transactions.some(
                (t) => +t.date.slice(8) === d && t.date.startsWith("2026-10"),
              ) && (
                <View className="w-[3px] h-[3px] rounded-[2px] bg-nebula-purple" />
              )}
            </View>
          </Pressable>
        ))}
      </View>
      <T bold size={13}>
        {day} de outubro
        {day === 19 ? " · Hoje" : day > 19 ? " · Agendado" : ""}
      </T>
      {dayItems.length ? (
        dayItems.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
      ) : (
        <T muted size={12}>
          Nenhum lançamento neste dia.
        </T>
      )}
    </View>
  );
}
