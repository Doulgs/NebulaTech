import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname } from "expo-router";
import {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
  ReduceMotion,
  type SharedValue,
} from "react-native-reanimated";

const NavigationMotion = createContext<SharedValue<number> | null>(null);
export function NavigationMotionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const collapsed = useSharedValue(0);
  const path = usePathname();
  useEffect(() => {
    collapsed.set(0);
  }, [path, collapsed]);
  return (
    <NavigationMotion.Provider value={collapsed}>
      {children}
    </NavigationMotion.Provider>
  );
}
export function useNavigationMotion() {
  return useContext(NavigationMotion);
}

/** Direction hysteresis prevents jitter; bounce and tiny movements don't toggle the bar. */
export function useNavigationScroll() {
  const collapsed = useNavigationMotion();
  return useAnimatedScrollHandler<{ previous: number; travel: number }>({
    onScroll(event, context) {
      const max = Math.max(
        0,
        event.contentSize.height - event.layoutMeasurement.height,
      );
      const y = Math.max(0, Math.min(max, event.contentOffset.y));
      const delta = y - (context.previous ?? 0);
      context.previous = y;
      if (!collapsed) return;
      if (y < 16) {
        if (collapsed.get() !== 0)
          collapsed.set(
            withSpring(0, {
              duration: 300,
              dampingRatio: 1,
              reduceMotion: ReduceMotion.System,
            }),
          );
        context.travel = 0;
        return;
      }
      if (Math.abs(delta) < 1) return;
      const travel = context.travel ?? 0;
      context.travel =
        Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (Math.abs(context.travel) < 20) return;
      const target = context.travel > 0 ? 1 : 0;
      if (
        (target === 1 && collapsed.get() < 0.5) ||
        (target === 0 && collapsed.get() > 0.5)
      ) {
        collapsed.set(
          withSpring(target, {
            duration: 300,
            dampingRatio: 1,
            reduceMotion: ReduceMotion.System,
          }),
        );
      }
      context.travel = 0;
    },
  });
}
