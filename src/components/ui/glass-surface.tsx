import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { useEffect, useState, type ReactNode } from "react";
import {
  AccessibilityInfo,
  Platform,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Gradient } from "./gradient";
import { palette } from "@/theme/colors";
import { cn } from "@/theme/classes";

export function GlassSurface({
  children,
  className,
  style,
  tint = palette.glassTint,
}: {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  tint?: string;
}) {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceTransparencyEnabled().then((value) => {
      if (mounted) setReduced(value);
    });
    const subscription = AccessibilityInfo.addEventListener(
      "reduceTransparencyChanged",
      setReduced,
    );
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);
  const native =
    Platform.OS === "ios" &&
    !reduced &&
    isGlassEffectAPIAvailable() &&
    isLiquidGlassAvailable();
  return (
    <View
      className={cn(
        "relative overflow-hidden rounded-full border border-nebula-border",
        className,
      )}
      style={style}
    >
      {native ? (
        <GlassView
          pointerEvents="none"
          glassEffectStyle="regular"
          tintColor={tint}
          colorScheme="dark"
          style={{ position: "absolute", inset: 0, borderRadius: 999 }}
        />
      ) : (
        <Gradient
          pointerEvents="none"
          colors={[palette.glassTop, palette.glassBottom]}
          className="absolute inset-0"
        />
      )}
      {children}
    </View>
  );
}
