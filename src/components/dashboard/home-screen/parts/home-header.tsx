import { IconButton } from "@/components/ui/button";
import { Chip, Chips } from "@/components/ui/chip";
import { GlassSurface } from "@/components/ui/glass-surface";
import { Icon } from "@/components/ui/icon";
import { PressScale } from "@/components/ui/press-scale";
import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import type { useDashboard } from "@/hooks/use-dashboard";
import { palette } from "@/theme/colors";
import { router } from "expo-router";
import { View } from "react-native";

export function HomeHeader({
  model,
}: {
  model: ReturnType<typeof useDashboard>;
}) {
  const { data, calendar, setCalendar, togglePrivacy } = model;
  const firstName = data.session?.name.trim().split(/\s+/)[0];
  return (
    <View className="gap-5">
      <Row className="justify-between">
        <PressScale
          accessibilityLabel="Abrir perfil"
          onPress={() => router.push("/profile")}
        >
          <GlassSurface className="h-11 w-11 items-center justify-center">
            <T bold size={14} className="text-nebula-purple">
              {firstName?.slice(0, 1).toUpperCase()}
            </T>
          </GlassSurface>
        </PressScale>
        <Row className="flex-1 gap-1.5">
          <Icon name="chat" size={18} tint={palette.purple} />
          <T bold size={15}>
            Andromeda
          </T>
        </Row>
        <Row className="gap-2">
          <IconButton
            name={data.hide ? "hidden" : "eye"}
            label={data.hide ? "Mostrar valores" : "Ocultar valores"}
            onPress={togglePrivacy}
          />
          <IconButton
            name="plus"
            label="Nova transação"
            onPress={() => router.push("/add")}
            active
          />
        </Row>
      </Row>
      <Chips>
        <Chip
          label="Visão geral"
          active={!calendar}
          onPress={() => setCalendar(false)}
        />
        <Chip
          label="Calendário"
          active={calendar}
          onPress={() => setCalendar(true)}
        />
        <Chip label="Carteira" onPress={() => router.replace("/cards")} />
      </Chips>
      <View className="gap-0.5">
        <T muted size={13}>
          Outubro de 2026 · Demonstração
        </T>
        <T
          accessibilityRole="header"
          size={34}
          bold
          className="tracking-[-1px]"
        >
          Olá, {firstName || "bem-vindo"}
        </T>
      </View>
    </View>
  );
}
