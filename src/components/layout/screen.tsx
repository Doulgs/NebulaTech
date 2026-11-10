import Animated from "react-native-reanimated";
import { useNavigationScroll } from "./navigation-motion";
import { useContext } from "react";
import { SheetContext } from "./sheet-context";
import { tokens } from "@/theme/tokens";
import { cn } from "@/theme/classes";
import { router } from "expo-router";
import { type ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "@/components/ui/button";
import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
export function BackTitle({
  title,
  subtitle,
  action,
  onBack,
  back = false,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  onBack?: () => void;
  back?: boolean;
}) {
  const inSheet = useContext(SheetContext);
  const close =
    onBack ??
    (() => (router.canGoBack() ? router.back() : router.replace("/home")));
  return (
    <View className="gap-3">
      {!inSheet && (back || !!onBack) && (
        <IconButton name="back" label="Voltar" onPress={close} />
      )}
      <Row className="items-start justify-between gap-3">
        <View className="min-w-0 flex-1 gap-1.5">
          <T
            accessibilityRole="header"
            bold
            size={inSheet ? 26 : 34}
            className="tracking-[-0.9px]"
          >
            {title}
          </T>
          {!!subtitle && (
            <T muted size={14}>
              {subtitle}
            </T>
          )}
        </View>
        {inSheet ? (
          <IconButton name="close" label="Fechar" onPress={close} />
        ) : (
          action
        )}
      </Row>
    </View>
  );
}
export function Page({
  children,
  header,
  padded = true,
}: {
  children: ReactNode;
  header?: ReactNode;
  padded?: boolean;
}) {
  const inset = useSafeAreaInsets();
  const onScroll = useNavigationScroll();
  return (
    <View className="flex-1" style={{ paddingTop: inset.top }}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: tokens.spacing.section,
          paddingBottom: Math.max(inset.bottom, 14) + 86,
        }}
      >
        {!!header && (
          <View testID="screen-header" className="px-screen pt-5">
            {header}
          </View>
        )}
        <View className={cn("gap-section", padded && "px-screen")}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
