import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useNavigationMotion } from "./navigation-motion";
import { Icon } from "@/components/ui/icon";
import { GlassSurface } from "@/components/ui/glass-surface";
import { Gradient } from "@/components/ui/gradient";
import { palette } from "@/theme/colors";
import { seed } from "@/mock";
import { router, usePathname, type Href } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const destinations = seed.nav.filter((item) => item.id !== "history");
const items = [
  ...destinations.slice(0, 2),
  { id: "add", label: "Nova transação" },
  ...destinations.slice(2),
];

export function AppNavigation() {
  const path = usePathname();
  const inset = useSafeAreaInsets();
  const collapsed = useNavigationMotion();
  const plateStyle = useAnimatedStyle(() => {
    const scale = 1 - (collapsed?.get() ?? 0) * 0.18;
    return { transform: [{ scale }] };
  });
  return (
    <View
      pointerEvents="box-none"
      className="absolute left-4 right-4"
      style={{ bottom: Math.max(inset.bottom, 14) }}
    >
      <Animated.View
        testID="tab-bar"
        className="h-[64px] justify-center"
        style={plateStyle}
      >
        <View
          testID="tab-bar-plate"
          pointerEvents="none"
          className="absolute inset-0"
          style={{ boxShadow: "0 8px 28px #00000040" }}
        >
          <GlassSurface
            tint="#15161B99"
            className="h-full border-white/[0.16] bg-[#17181D]/80"
          >
            <View className="h-full" />
          </GlassSurface>
        </View>
        <View
          accessibilityRole="tablist"
          className="flex-row items-center px-2"
        >
          {items.map((item) => {
            const add = item.id === "add";
            const selected = !add && path === `/${item.id}`;
            return (
              <Pressable
                key={item.id}
                hitSlop={6}
                accessibilityRole={add ? "button" : "tab"}
                accessibilityLabel={item.label}
                accessibilityState={add ? undefined : { selected }}
                onPress={() => {
                  if (add) router.push("/add");
                  else if (!selected) router.replace(`/${item.id}` as Href);
                }}
                className="h-12 min-w-[44px] flex-1 items-center justify-center active:opacity-70"
              >
                {add ? (
                  <Gradient
                    colors={["#B99AF4", "#8B5ACF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="h-[38px] w-[38px] items-center justify-center rounded-full border border-[#E8D9FF]/30"
                    style={{ boxShadow: "inset 0 1px 0 #FFFFFF25" }}
                  >
                    <Icon name="plus" size={22} />
                  </Gradient>
                ) : (
                  <View className="h-[36px] w-[52px] items-center justify-center">
                    {selected && (
                      <Gradient
                        testID="tab-selection"
                        pointerEvents="none"
                        colors={["#FFFFFF30", "#FFFFFF1C"]}
                        className="absolute inset-0 rounded-full border border-white/[0.08]"
                      />
                    )}
                    <Icon
                      name={item.id}
                      size={18}
                      filled={selected && item.id === "home"}
                      tint={selected ? palette.text : "#C8C3D0"}
                    />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}
