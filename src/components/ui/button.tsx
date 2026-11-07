import { Gradient } from "@/components/ui/gradient";
import { cn } from "@/theme/classes";
import { type ReactNode } from "react";
import { View } from "react-native";
import { PressScale } from "./press-scale";

import { Icon } from "./icon";
import { T } from "./text";
const buttonInner =
  "min-h-[48px] flex-row items-center justify-center gap-[9px] px-[18px] py-3";
export function Button({
  children,
  onPress,
  secondary = false,
  disabled = false,
  icon,
  testID,
  className,
}: {
  children: ReactNode;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  icon?: string;
  testID?: string;
  className?: string;
}) {
  return (
    <PressScale
      testID={testID}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={cn(
        "shrink active:opacity-80",
        disabled && "opacity-[0.45]",
        secondary && "rounded-2xl border border-nebula-border bg-white/[0.03]",
        className,
      )}
    >
      {secondary ? (
        <View className={buttonInner}>
          {!!icon && <Icon name={icon} size={18} />}
          <T bold>{children}</T>
        </View>
      ) : (
        <Gradient
          colors={["#9E80E8", "#8060CF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={cn(buttonInner, "min-h-[54px] rounded-[17px]")}
        >
          {!!icon && <Icon name={icon} size={18} />}
          <T bold size={15}>
            {children}
          </T>
        </Gradient>
      )}
    </PressScale>
  );
}
export function IconButton({
  name,
  onPress,
  label,
  active = false,
}: {
  name: string;
  onPress: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <PressScale
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={cn(
        "h-11 w-11 items-center justify-center rounded-full border border-nebula-border bg-white/[0.04]",
        active && "border-[#9B7EC2] bg-[#432C6B]",
      )}
    >
      <Icon name={name} size={18} />
    </PressScale>
  );
}
