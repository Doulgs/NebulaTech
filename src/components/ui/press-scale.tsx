import { tokens } from "@/theme/tokens";
import { useState, type ReactNode } from "react";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  cubicBezier,
  useReducedMotion,
} from "react-native-reanimated";

type Props = Omit<PressableProps, "children" | "style"> & {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};
/** Feedback only: no tab animations, no JS frame loop. */
export function PressScale({
  children,
  className,
  style,
  onPressIn,
  onPressOut,
  ...props
}: Props) {
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion();
  return (
    <Pressable
      {...props}
      accessibilityRole={props.accessibilityRole ?? "button"}
      className={className}
      style={style}
      pressRetentionOffset={16}
      onPressIn={(event) => {
        setPressed(true);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setPressed(false);
        onPressOut?.(event);
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: pressed && !reduced ? tokens.motion.scale : 1 }],
          opacity: pressed ? 0.85 : 1,
          transitionProperty: ["transform", "opacity"],
          transitionDuration: reduced ? 0 : tokens.motion.press,
          transitionTimingFunction: cubicBezier(0.23, 1, 0.32, 1),
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}
