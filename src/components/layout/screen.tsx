import Animated from "react-native-reanimated";
import { useNavigationScroll } from "./navigation-motion";
import { useContext } from "react";
import { SheetContext } from "./sheet-context";
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
  if (inSheet)
    return (
      <Row className="items-start justify-between gap-3 pt-2">
        <View className="flex-1 gap-1">
          <T bold size={23} className="tracking-[-0.4px]">
            {title}
          </T>
          <T muted size={12}>
            {subtitle || "Confira as informações deste lançamento"}
          </T>
        </View>
        <IconButton name="close" label="Fechar" onPress={close} />
      </Row>
    );
  return (
    <Row className="justify-between">
      <Row className="flex-1">
        {(back || !!onBack) && (
          <IconButton
            name="back"
            label="Voltar"
            onPress={
              onBack ||
              (() =>
                router.canGoBack() ? router.back() : router.replace("/home"))
            }
          />
        )}
        <View className="shrink gap-0.5">
          <T bold size={26}>
            {title}
          </T>
          {!!subtitle && (
            <T muted size={12}>
              {subtitle}
            </T>
          )}
        </View>
      </Row>
      {action}
    </Row>
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
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-section"
        contentContainerStyle={{
          paddingBottom: Math.max(inset.bottom, 20) + 92,
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
