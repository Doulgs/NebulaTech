import { IconButton } from "@/components/ui/button";
import { GlassSurface } from "@/components/ui/glass-surface";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/theme/classes";
import { palette } from "@/theme/colors";
import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigationMotion } from "./navigation-motion";

const tabs = [
  { route: "/home", icon: "home", label: "Início" },
  { route: "/cards", icon: "cards", label: "Carteira" },
  { route: "/analytics", icon: "analytics", label: "Análises" },
  { route: "/history", icon: "history", label: "Atividades" },
] as const;

export function AppNavigation() {
  const path = usePathname();
  const inset = useSafeAreaInsets();
  const collapsed = useNavigationMotion();
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: (collapsed?.get() ?? 0) * 5 }],
  }));

  if (path === "/chat") return null;

  return (
    <View
      pointerEvents="box-none"
      className="absolute left-4 right-4"
      style={{ bottom: Math.max(inset.bottom, 14) }}
    >
      <Animated.View testID="tab-bar" style={[styles.dock, style]}>
        <View testID="tab-bar-plate" className="flex-1">
          <GlassSurface className="p-1">
            <View accessibilityRole="tablist" className="flex-row">
              {tabs.map((tab) => {
                const selected = path === tab.route;
                return (
                  <Pressable
                    key={tab.route}
                    accessibilityRole="tab"
                    accessibilityLabel={tab.label}
                    aria-selected={selected}
                    onPress={() => {
                      if (!selected) router.replace(tab.route);
                    }}
                    className={cn(
                      "h-[50px] flex-1 items-center justify-center rounded-full active:opacity-70",
                      selected && "bg-nebula-selected",
                    )}
                    testID={selected ? "tab-selection" : undefined}
                  >
                    <Icon
                      name={tab.icon}
                      size={22}
                      tint={selected ? palette.purple : palette.text}
                    />
                  </Pressable>
                );
              })}
            </View>
          </GlassSurface>
        </View>
        <IconButton
          name="chat"
          label="Abrir assistente Andromeda"
          onPress={() => router.push("/chat")}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: { flexDirection: "row", alignItems: "center", gap: 8 },
});
