import { NumberText, T } from "@/components/ui/text";
import { seed } from "@/mock";
import { cn } from "@/theme/classes";
import { color, money } from "@/utils/finance";
import { Pressable, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";
export function FlowChart() {
  const min = Math.min(...seed.flow),
    max = Math.max(...seed.flow);
  const points = seed.flow
    .map(
      (v, i) =>
        `${i ? "L" : "M"}${(i / (seed.flow.length - 1)) * 300 + 4} ${85 - ((v - min) / (max - min)) * 72}`,
    )
    .join(" ");
  return (
    <Svg width="100%" height={96} viewBox="0 0 308 96">
      <Defs>
        <LinearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A787F6" stopOpacity={0.3} />
          <Stop offset="1" stopColor="#A787F6" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={points + " L304 96 L4 96Z"} fill="url(#fill)" />
      <Path d={points} stroke="#B79CFF" strokeWidth={2} fill="none" />
    </Svg>
  );
}
export function Ring({ value, size = 64 }: { value: number; size?: number }) {
  const c = 2 * Math.PI * 26;
  return (
    <View
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        style={{ position: "absolute" }}
      >
        <Circle
          cx={32}
          cy={32}
          r={26}
          fill="none"
          stroke="#FFFFFF16"
          strokeWidth={6}
        />
        <Circle
          cx={32}
          cy={32}
          r={26}
          fill="none"
          stroke="#B79CFF"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${Math.min(value, 1) * c} ${c}`}
          transform="rotate(-90 32 32)"
        />
      </Svg>
      <NumberText size={15}>{Math.round(value * 100)}%</NumberText>
    </View>
  );
}
export function Donut({
  categories,
  selected,
  onSelect,
}: {
  categories: { id: string; h: number; value: number; label: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const total = categories.reduce((s, c) => s + c.value, 0),
    circ = 2 * Math.PI * 78;
  const sel = categories.find((c) => c.id === selected);
  return (
    <View className="items-center justify-center h-[230px]">
      <Svg
        width={230}
        height={230}
        viewBox="0 0 210 210"
        accessibilityLabel="Gastos por categoria"
      >
        {categories
          .filter((c) => c.value > 0)
          .map((c, index, visible) => {
            const offset =
              (-visible
                .slice(0, index)
                .reduce((sum, item) => sum + item.value, 0) /
                (total || 1)) *
              circ;
            return (
              <Circle
                key={c.id}
                cx={105}
                cy={105}
                r={78}
                fill="none"
                stroke={color(c.h)}
                strokeWidth={selected === c.id ? 24 : 17}
                opacity={selected && selected !== c.id ? 0.3 : 1}
                strokeDasharray={`${Math.max((c.value / (total || 1)) * circ - 4, 1)} ${circ}`}
                strokeDashoffset={offset}
                transform="rotate(-90 105 105)"
              />
            );
          })}
      </Svg>
      <View pointerEvents="none" className="absolute items-center gap-[6px]">
        <T muted size={11}>
          {sel?.label || "Total gasto"}
        </T>
        <NumberText size={24}>{money(sel?.value ?? total)}</NumberText>
        <T size={10} className="text-nebula-green">
          {sel
            ? `${((sel.value / (total || 1)) * 100).toFixed(1)}% do mês`
            : "Outubro 2026"}
        </T>
      </View>
    </View>
  );
}
export function Bars({
  period,
  selected,
  onSelect,
  expense,
  income,
}: {
  period: string;
  selected: number;
  onSelect: (i: number) => void;
  expense: number;
  income: number;
}) {
  const months = seed.months.map((m, i) =>
    i === 5 ? { ...m, out: expense, inc: income } : m,
  );
  return (
    <View className="flex-row h-[175px] gap-[12px] items-end">
      {months.map((m, i) =>
        period === "3M" && i < 3 ? null : (
          <Pressable
            key={m.label}
            accessibilityRole="button"
            accessibilityLabel={m.full}
            onPress={() => onSelect(i)}
            className={cn(
              "flex-1 items-center gap-[10px] rounded-[10px] pt-[8px]",
              selected === i ? "bg-[#8B5CF614]" : "bg-[transparent]",
            )}
          >
            <View className="h-[135px] flex-row items-end gap-[4px]">
              <View
                className="w-[12px] rounded-[4px] bg-nebula-purple"
                style={{ height: Math.min(135, (m.inc / 9000) * 130) }}
              />
              <View
                className="w-[12px] rounded-[4px] bg-[#51416F]"
                style={{ height: Math.min(135, (m.out / 9000) * 130) }}
              />
            </View>
            <T size={10} muted={selected !== i}>
              {m.label}
            </T>
          </Pressable>
        ),
      )}
    </View>
  );
}
