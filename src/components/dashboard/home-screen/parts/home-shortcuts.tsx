import { Icon } from "@/components/ui/icon";
import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { palette } from "@/theme/colors";
import { PressScale } from "@/components/ui/press-scale";
import { router, type Href } from "expo-router";
import { View } from "react-native";
export function HomeShortcuts() {
  return (
    <Row className="gap-3">
      {[
        ["members", "Membros"],
        ["categories", "Categorias"],
        ["chat", "Chat com IA"],
      ].map(([id, label]) => (
        <PressScale
          key={id}
          accessibilityLabel={label}
          onPress={() => router.push(`/${id}` as Href)}
          className="flex-1"
        >
          <View className="items-center justify-center gap-3 rounded-[20px] border border-white/[0.09] bg-nebula-surface py-4">
            <View className="h-6 w-6 items-center justify-center">
              <Icon name={id} size={21} tint={palette.text} />
            </View>
            <T size={12}>{label}</T>
          </View>
        </PressScale>
      ))}
    </Row>
  );
}
