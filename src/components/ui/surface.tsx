import { palette } from "@/theme/colors";
import { Gradient } from "./gradient";
import { cn } from "@/theme/classes";
import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

export function Card({
  children,
  style,
  className,
  tone = "default",
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  tone?: "default" | "orbital";
}) {
  return (
    <View
      className={cn(
        "gap-4 rounded-card border border-nebula-border bg-nebula-surface p-4",
        tone === "orbital" && "overflow-hidden border-nebula-purple/25",
        className,
      )}
      style={[{ boxShadow: "inset 0 1px 0 #FFFFFF06" }, style]}
    >
      {tone === "orbital" && (
        <Gradient
          pointerEvents="none"
          colors={[palette.raised, palette.surface, palette.surface]}
          locations={[0, 0.8, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0"
        />
      )}
      {children}
    </View>
  );
}
export function Row({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}) {
  return (
    <View
      className={cn("flex-row items-center gap-3", className)}
      style={style}
    >
      {children}
    </View>
  );
}
