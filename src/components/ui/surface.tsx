import { cn } from "@/theme/classes";
import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

export function Card({
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
      className={cn(
        "gap-4 rounded-card border border-nebula-border bg-nebula-surface p-5",
        className,
      )}
      style={[
        { boxShadow: "0 6px 20px #00000016, inset 0 1px 0 #FFFFFF05" },
        style,
      ]}
    >
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
