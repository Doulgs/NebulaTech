import { cn } from "@/theme/classes";
import { type ReactNode } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { T } from "./text";
export function Chip({
  label,
  active,
  onPress,
  dot,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
  dot?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      onPress={onPress}
      className={cn(
        "min-h-11 flex-row items-center justify-center gap-[7px] rounded-full border border-nebula-border bg-nebula-surface px-4",
        active && "border-nebula-neutral bg-nebula-neutral",
      )}
    >
      {!!dot && (
        <View
          className="h-[7px] w-[7px] rounded-full"
          style={{ backgroundColor: dot }}
        />
      )}
      <T
        size={13}
        bold={active}
        className={active ? "text-nebula-ink" : undefined}
      >
        {label}
      </T>
    </Pressable>
  );
}
export function Chips({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
    >
      {children}
    </ScrollView>
  );
}
