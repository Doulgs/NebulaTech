import { BackTitle, Page } from "@/components/layout/screen";
import { Button, IconButton } from "@/components/ui/button";
import { Card, Row } from "@/components/ui/surface";
import { Chip } from "@/components/ui/chip";
import { Icon } from "@/components/ui/icon";
import { NumberText, T } from "@/components/ui/text";
import { Progress } from "@/components/ui/progress";
import { palette } from "@/theme/colors";
import { useFinance } from "@/hooks/use-finance";
import { cn } from "@/theme/classes";
import { color, money, totals } from "@/utils/finance";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
export default function Categories() {
  const { data } = useFinance();
  const [tab, setTab] = useState("out"),
    sum = totals(data);
  const ids = tab === "out" ? data.expenseCategories : ["renda"];
  const total = ids.reduce((s, id) => s + sum.category(id), 0),
    budget = ids.reduce((s, id) => s + (data.categories[id].budget || 0), 0);
  const over = ids.filter(
    (id) => sum.category(id) > (data.categories[id].budget || Infinity),
  );
  return (
    <Page
      header={
        <BackTitle
          title="Categorias"
          subtitle="Orçamentos e gastos por categoria."
          back
          action={
            <IconButton
              name="plus"
              label="Nova categoria"
              active
              onPress={() => router.push("/new-category")}
            />
          }
        />
      }
    >
      <Row>
        <Chip
          label="Despesas"
          active={tab === "out"}
          onPress={() => setTab("out")}
        />
        <Chip
          label="Receitas"
          active={tab === "in"}
          onPress={() => setTab("in")}
        />
      </Row>
      <Card tone="orbital">
        <T muted size={11}>
          {tab === "out"
            ? "Gasto do mês vs. orçamento"
            : "Recebido vs. previsto"}
        </T>
        <NumberText size={22}>
          {data.hide ? "••••" : `${money(total)} de ${money(budget)}`}
        </NumberText>
        <Progress value={total / (budget || 1)} />
        <T
          size={11}
          className={cn(
            "",
            over.length ? "text-nebula-red" : "text-nebula-green",
          )}
        >
          {over.length
            ? `${over.length} categoria(s) acima do orçamento`
            : "Tudo dentro do orçamento"}
        </T>
      </Card>
      <Card className="p-[12px]">
        {ids.map((id) => {
          const c = data.categories[id],
            value = sum.category(id),
            budget = c.budget || 0;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Ver ${c.label}`}
              key={id}
              onPress={() =>
                router.push({ pathname: "/history", params: { category: id } })
              }
              className="p-[10px] gap-[12px]"
            >
              <Row>
                <View
                  className="w-[38px] h-[38px] rounded-full items-center justify-center"
                  style={{ backgroundColor: color(c.h) + "22" }}
                >
                  <Icon path={c.icon} tint={color(c.h)} size={19} />
                </View>
                <View className="flex-1 gap-[2px]">
                  <T bold size={13}>
                    {c.label}
                  </T>
                  <T size={10} muted>
                    {data.hide ? "••••" : `${money(value)} de ${money(budget)}`}
                  </T>
                </View>
                <T
                  size={12}
                  className={cn(
                    "",
                    value > budget ? "text-nebula-red" : "text-nebula-muted",
                  )}
                >
                  {budget ? Math.round((value / budget) * 100) + "%" : "—"}
                </T>
              </Row>
              <Progress
                value={budget ? value / budget : 0}
                tint={value > budget ? palette.red : color(c.h)}
              />
            </Pressable>
          );
        })}
      </Card>
      <Button
        secondary
        icon="plus"
        onPress={() => router.push("/new-category")}
      >
        Nova categoria
      </Button>
    </Page>
  );
}
