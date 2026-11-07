import type { ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { cn } from "@/theme/classes";

export function GlassSurface({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  tint?: string;
}) {
  return (
    <View
      className={cn(
        "relative overflow-hidden rounded-full border border-white/[0.15] bg-[#21172F]/75",
        className,
      )}
      style={[
        {
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          boxShadow: "inset 0 1px 0 #FFFFFF12, 0 10px 32px #00000035",
        } as ViewStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}
