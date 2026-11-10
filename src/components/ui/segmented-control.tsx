import { cn } from "@/theme/classes";
import { Pressable, View } from "react-native";
import { T } from "./text";

export function SegmentedControl<TValue extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: TValue; label: string }[];
  value: TValue;
  onChange: (value: TValue) => void;
}) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="tablist"
      className="flex-row rounded-full border border-nebula-border bg-nebula-raised p-1"
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            aria-selected={selected}
            onPress={() => onChange(option.value)}
            className={cn(
              "min-h-11 flex-1 items-center justify-center rounded-full px-2 py-2 active:opacity-75",
              selected && "bg-nebula-neutral",
            )}
          >
            <T
              size={13}
              bold
              className={cn(
                "text-center",
                selected ? "text-nebula-ink" : "text-nebula-muted",
              )}
            >
              {option.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}
