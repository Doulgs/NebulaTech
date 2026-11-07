import { Chips } from "@/components/ui/chip";
import { Icon } from "@/components/ui/icon";
import { NumberText, T } from "@/components/ui/text";
import { Section } from "@/components/ui/section";
import { Gradient } from "@/components/ui/gradient";
import { useDashboard } from "@/hooks/use-dashboard";
import { color, money } from "@/utils/finance";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
export function CategoryPreview({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { data, sum } = model;
  return (
    <View className="gap-4">
      <Section
        title="Por categoria"
        action="Ver análise"
        onPress={() => router.replace("/analytics")}
      />
      <Chips>
        {data.expenseCategories
          .filter((id) => sum.category(id) > 0)
          .map((id) => {
            const c = data.categories[id];
            return (
              <Pressable
                key={id}
                accessibilityRole="button"
                accessibilityLabel={`Categoria ${c.label}`}
                onPress={() =>
                  router.replace({
                    pathname: "/history",
                    params: { category: id },
                  })
                }
                className="w-[148px] overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#211A2C]"
              >
                <Gradient
                  colors={[color(c.h) + "12", "#19141FFF"]}
                  className="gap-4 p-[18px]"
                >
                  <View
                    className="w-[34px] h-[34px] rounded-[12px] items-center justify-center"
                    style={{ backgroundColor: color(c.h) + "22" }}
                  >
                    <Icon path={c.icon} tint={color(c.h)} size={19} />
                  </View>
                  <View className="gap-[5px]">
                    <T size={14} bold>
                      {c.label}
                    </T>
                    <NumberText size={15}>
                      {data.hide ? "••••" : "− " + money(sum.category(id))}
                    </NumberText>
                  </View>
                </Gradient>
              </Pressable>
            );
          })}
      </Chips>
    </View>
  );
}
