import { View } from "react-native";
import { router } from "expo-router";
import { GlassSurface } from "@/components/ui/glass-surface";
import { Gradient } from "@/components/ui/gradient";
import { Icon } from "@/components/ui/icon";
import { PressScale } from "@/components/ui/press-scale";
import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { useDashboard } from "@/hooks/use-dashboard";
import { seed } from "@/mock";

function HeaderAction({
  name,
  label,
  onPress,
  dot = false,
}: {
  name: string;
  label: string;
  onPress: () => void;
  dot?: boolean;
}) {
  return (
    <View className="h-11 w-11 items-center justify-center">
      <GlassSurface className="absolute h-9 w-9" tint="#FFFFFF08">
        <View className="h-9 w-9" />
      </GlassSurface>
      <PressScale
        accessibilityLabel={label}
        onPress={onPress}
        className="h-11 w-11 items-center justify-center"
      >
        <View className="relative h-11 w-11 items-center justify-center">
          <Icon name={name} size={17} />
          {dot && (
            <View className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-nebula-purple" />
          )}
        </View>
      </PressScale>
    </View>
  );
}
export function HomeHeader({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { data, calendar, setCalendar } = model;
  const upcoming = data.transactions
    .filter((tx) => tx.date > seed.today)
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <Row className="justify-between gap-2">
        <View className="flex-1 gap-1">
          <T size={12} muted>
            Olá, {data.session?.name.split(" ")[0]}
          </T>
          <T bold size={28} className="tracking-[-0.7px]">
            Início
          </T>
        </View>
        <Row className="gap-2">
          <HeaderAction
            name="calendar"
            label={calendar ? "Mostrar resumo" : "Mostrar calendário"}
            onPress={() => setCalendar(!calendar)}
          />
          <HeaderAction
            name="bell"
            label="Ver próximos lançamentos"
            dot={upcoming.length > 0}
            onPress={() => router.push("/scheduled")}
          />
          <PressScale
            accessibilityLabel="Perfil e sair"
            onPress={() => router.push("/profile")}
            hitSlop={4}
          >
            <Gradient
              colors={["#7340BF", "#8A52E7"]}
              className="h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#BE9AF4]/70"
            >
              <T bold size={12}>
                {data.session?.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </T>
            </Gradient>
          </PressScale>
        </Row>
      </Row>
    </>
  );
}
