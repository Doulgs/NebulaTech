import { Chips } from "@/components/ui/chip";
import { Gradient } from "@/components/ui/gradient";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { Section } from "@/components/ui/section";
import { Row } from "@/components/ui/surface";
import { NumberText, T } from "@/components/ui/text";
import type { useDashboard } from "@/hooks/use-dashboard";
import { color, money } from "@/utils/finance";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export function CategoryPreview({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { data, sum } = model;
  const categories = data.expenseCategories
    .map((id) => ({ id, spent: sum.category(id) }))
    .filter(({ spent }) => spent > 0);

  if (!categories.length) return null;

  return (
    <View className="gap-4">
      <Section
        title="Por categoria"
        action="Ver análise"
        onPress={() => router.replace("/analytics")}
      />
      <Chips>
        {categories.map(({ id, spent }) => {
          const category = data.categories[id];
          const tint = color(category.h);
          const share = sum.expense > 0 ? spent / sum.expense : 0;

          return (
            <Pressable
              key={id}
              accessibilityRole="button"
              accessibilityLabel={`Categoria ${category.label}, ${data.hide ? "valor oculto" : money(spent)}`}
              onPress={() =>
                router.replace({
                  pathname: "/history",
                  params: { category: id },
                })
              }
              className="w-[160px] overflow-hidden rounded-card border bg-nebula-surface active:opacity-80"
              style={{ borderColor: tint + "45" }}
            >
              <Gradient
                pointerEvents="none"
                colors={[tint + "32", "transparent"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.2, y: 1 }}
                className="absolute inset-0"
              />
              <View className="flex-1 justify-between gap-3 p-3.5">
                <Row className="justify-between gap-2">
                  <View
                    className="h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: tint + "25" }}
                  >
                    <Icon path={category.icon} tint={tint} size={18} />
                  </View>
                  {!data.hide && (
                    <T size={11} bold style={{ color: tint }}>
                      {Math.round(share * 100)}%
                    </T>
                  )}
                </Row>
                <View className="gap-0.5">
                  <T size={13} muted>
                    {category.label}
                  </T>
                  <NumberText size={16}>
                    {data.hide ? "R$ ••••" : money(spent)}
                  </NumberText>
                </View>
                {!data.hide && <Progress value={share} tint={tint} />}
              </View>
            </Pressable>
          );
        })}
      </Chips>
    </View>
  );
}
