import { cn } from "@/theme/classes";
import { palette } from "@/theme/colors";
import { type ReactNode } from "react";
import { View } from "react-native";
import { GlassSurface } from "./glass-surface";
import { Icon } from "./icon";
import { PressScale } from "./press-scale";
import { T } from "./text";

export function Button({
  children,
  onPress,
  secondary = false,
  variant = "accent",
  disabled = false,
  icon,
  testID,
  className,
}: {
  children: ReactNode;
  onPress: () => void;
  secondary?: boolean;
  variant?: "accent" | "neutral";
  disabled?: boolean;
  icon?: string;
  testID?: string;
  className?: string;
}) {
  return (
    <PressScale
      testID={testID}
      disabled={disabled}
      accessibilityState={{ disabled }}
      onPress={onPress}
      className={cn("shrink rounded-full", className)}
    >
      <View
        className={cn(
          "min-h-[52px] flex-row items-center justify-center gap-2 rounded-full border px-4 py-3",
          disabled
            ? "border-transparent bg-nebula-disabled"
            : secondary
              ? "border-nebula-border bg-nebula-raised"
              : variant === "neutral"
                ? "border-transparent bg-nebula-neutral"
                : "border-transparent bg-nebula-purple",
        )}
      >
        {!!icon && (
          <Icon
            name={icon}
            size={18}
            tint={secondary && !disabled ? palette.text : palette.ink}
          />
        )}
        <T
          bold
          size={14}
          className={cn(
            "shrink text-center",
            (!secondary || disabled) && "text-nebula-ink",
          )}
        >
          {children}
        </T>
      </View>
    </PressScale>
  );
}

export function IconButton({
  name,
  onPress,
  label,
  active = false,
  disabled = false,
}: {
  name: string;
  onPress: () => void;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <PressScale
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={cn("h-11 w-11", disabled && "opacity-50")}
    >
      {active ? (
        <View className="h-11 w-11 items-center justify-center rounded-full bg-nebula-purple">
          <Icon name={name} size={20} tint={palette.ink} />
        </View>
      ) : (
        <GlassSurface className="h-11 w-11 items-center justify-center">
          <Icon name={name} size={19} />
        </GlassSurface>
      )}
    </PressScale>
  );
}
