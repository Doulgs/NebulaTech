import { cn } from "@/theme/classes";
import { type ReactNode } from "react";
import { Platform, Text, type StyleProp, type TextStyle } from "react-native";

const textSizes: Record<number, string> = {
  9: "text-[9px] leading-[13.5px]",
  10: "text-[10px] leading-[15px]",
  11: "text-[11px] leading-[16.5px]",
  12: "text-[12px] leading-[18px]",
  13: "text-[13px] leading-[19.5px]",
  14: "text-[14px] leading-[21px]",
  15: "text-[15px] leading-[22.5px]",
  16: "text-[16px] leading-[24px]",
  17: "text-[17px] leading-[25.5px]",
  18: "text-[18px] leading-[27px]",
  20: "text-[20px] leading-[30px]",
  21: "text-[21px] leading-[31.5px]",
  22: "text-[22px] leading-[33px]",
  24: "text-[24px] leading-[36px]",
  26: "text-[26px] leading-[39px]",
  28: "text-[28px] leading-[42px]",
  30: "text-[30px] leading-[45px]",
  32: "text-[32px] leading-[48px]",
  34: "text-[34px] leading-[51px]",
  38: "text-[38px] leading-[57px]",
};
type TextProps = {
  children: ReactNode;
  size?: number;
  style?: StyleProp<TextStyle>;
  className?: string;
  selectable?: boolean;
};
export function T({
  children,
  muted = false,
  size = 14,
  bold = false,
  style,
  className,
  ...props
}: TextProps & { muted?: boolean; bold?: boolean }) {
  return (
    <Text
      {...props}
      className={cn(
        muted ? "text-nebula-muted" : "text-nebula-text",
        bold ? "font-manrope-bold" : "font-body",
        textSizes[size],
        className,
      )}
      style={[
        !textSizes[size] && { fontSize: size, lineHeight: size * 1.5 },
        Platform.OS === "ios" && {
          fontFamily: "System",
          fontWeight: bold ? "600" : "400",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function NumberText({
  children,
  size = 24,
  style,
  className,
}: TextProps) {
  return (
    <Text
      selectable
      className={cn(
        "font-display text-nebula-text tracking-[-0.6px] tabular-nums",
        textSizes[size]?.split(" ")[0],
        className,
      )}
      style={[
        { fontSize: size },
        Platform.OS === "ios" && {
          fontFamily: "System",
          fontWeight: "600",
          fontVariant: ["tabular-nums"],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
