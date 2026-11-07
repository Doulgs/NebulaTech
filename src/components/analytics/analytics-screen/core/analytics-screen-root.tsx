import { Bars, Donut } from "@/components/dashboard/charts";
import { BackTitle, Page } from "@/components/layout/screen";
import { Card, Row } from "@/components/ui/surface";
import { Chip } from "@/components/ui/chip";
import { NumberText, T } from "@/components/ui/text";
import { Section } from "@/components/ui/section";
import { useFinance } from "@/hooks/use-finance";
import { seed } from "@/mock";
import { cn } from "@/theme/classes";
import { color, money, totals } from "@/utils/finance";
import { useState } from "react";
import { Pressable, View } from "react-native";
export default function Analytics() {
  const { data } = useFinance();
  const sum = totals(data),
    [period, setPeriod] = useState("6M"),
    [selected, setSelected] = useState<string | null>(null),
    [month, setMonth] = useState(5);
  const categories = data.expenseCategories.map((id) => ({
    id,
    ...data.categories[id],
    value: sum.category(id),
  }));
  const total = categories.reduce((s, c) => s + c.value, 0);
  const biggest = [...categories].sort((a, b) => b.value - a.value)[0];
  const monthData = seed.months[month];
  const toggle = (id: string) => setSelected(selected === id ? null : id);
  const indicators = [
    [
      "Taxa de poupança",
      `${(((sum.income - sum.expense) / sum.income) * 100).toFixed(1).replace(".", ",")}%`,
      "Da renda recebida",
    ],
    ["Gasto médio diário", money(sum.expense / 19), "Meta: R$ 216,00"],
    [
      "Maior categoria",
      biggest?.label || "—",
      `${(((biggest?.value || 0) / (total || 1)) * 100).toFixed(1)}% dos gastos`,
    ],
    ["Patrimônio", money(sum.balance), "Total nas suas contas"],
  ];
  return (
    <Page
      header={
        <BackTitle title="Análises" subtitle="Enxergue além dos números." />
      }
    >
      <Card>
        <Section title="Gastos por categoria" />
        <Donut categories={categories} selected={selected} onSelect={toggle} />
        {categories
          .filter((c) => c.value > 0)
          .map((c) => (
            <Pressable
              key={c.id}
              accessibilityRole="button"
              onPress={() => toggle(c.id)}
              className={cn(
                "rounded-[12px] p-[8px]",
                selected === c.id ? "bg-[#8B5CF61F]" : "bg-[transparent]",
              )}
            >
              <Row className="justify-between">
                <Row>
                  <View
                    className="w-[8px] h-[8px] rounded-[5px]"
                    style={{ backgroundColor: color(c.h) }}
                  />
                  <T size={12}>{c.label}</T>
                </Row>
                <Row className="gap-[10px]">
                  <NumberText size={12}>
                    {data.hide ? "••••" : money(c.value)}
                  </NumberText>
                  <T size={10} muted>
                    {((c.value / (total || 1)) * 100).toFixed(1)}%
                  </T>
                </Row>
              </Row>
            </Pressable>
          ))}
      </Card>
      <Card>
        <Row className="justify-between">
          <T size={16} bold>
            Receitas × despesas
          </T>
          <Row className="gap-[5px]">
            {["3M", "6M"].map((p) => (
              <Chip
                key={p}
                label={p}
                active={period === p}
                onPress={() => {
                  setPeriod(p);
                  if (p === "3M" && month < 3) setMonth(3);
                }}
              />
            ))}
          </Row>
        </Row>
        <Bars
          period={period}
          selected={month}
          onSelect={setMonth}
          income={sum.income}
          expense={sum.expense}
        />
        <Row className="justify-center">
          <T size={10} className="text-nebula-purple">
            ● Receitas
          </T>
          <T size={10} className="text-[#84719F]">
            ● Despesas
          </T>
        </Row>
        <T size={12} bold>
          {monthData.full} 2026
        </T>
        <Row className="justify-between">
          <NumberText size={14} className="text-nebula-green">
            {data.hide
              ? "••••"
              : "+ " + money(month === 5 ? sum.income : monthData.inc)}
          </NumberText>
          <NumberText size={14}>
            {data.hide
              ? "••••"
              : "− " + money(month === 5 ? sum.expense : monthData.out)}
          </NumberText>
        </Row>
      </Card>
      <Section title="Seus indicadores" />
      <View className="flex-row flex-wrap gap-[12px]">
        {indicators.map(([label, value, note]) => (
          <Card key={label} className="w-[48%] grow p-[16px] gap-[10px]">
            <T muted size={10}>
              {label}
            </T>
            <NumberText size={18}>{data.hide ? "••••" : value}</NumberText>
            <T size={9} className="text-nebula-green">
              {note}
            </T>
          </Card>
        ))}
      </View>
    </Page>
  );
}
