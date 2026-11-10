import { tokens } from "@/theme/tokens";
import { palette } from "@/theme/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import { useEffect, useRef, type ReactNode } from "react";
import { BackHandler, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { closeSheetRoute } from "./navigation";
import { SheetContext } from "./sheet-context";
export const SheetScrollView = cssInterop(BottomSheetScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});
const backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    opacity={0.7}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    pressBehavior="close"
  />
);
const backgroundStyle = {
  backgroundColor: palette.bg,
  borderRadius: tokens.radius.sheet,
};
export function RouteSheet({
  header,
  footer,
  children,
}: {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const inset = useSafeAreaInsets();
  const ref = useRef<BottomSheet>(null);
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      ref.current?.close();
      return true;
    });
    return () => sub.remove();
  }, []);
  return (
    <SheetContext.Provider value={true}>
      <View className="flex-1">
        <BottomSheet
          ref={ref}
          index={0}
          accessible={false}
          accessibilityRole="none"
          snapPoints={["92%"]}
          enableDynamicSizing={false}
          enablePanDownToClose
          onClose={closeSheetRoute}
          topInset={inset.top + 8}
          backdropComponent={backdrop}
          handleIndicatorStyle={{ backgroundColor: palette.muted, width: 40 }}
          backgroundStyle={backgroundStyle}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          enableBlurKeyboardOnGesture
          android_keyboardInputMode="adjustResize"
        >
          <View className="flex-1">
            <View
              testID="sheet-header"
              className="border-b border-nebula-border px-5 pb-4 pt-1"
            >
              {header}
            </View>
            <SheetScrollView
              className="flex-1"
              contentContainerClassName="gap-[22px] px-5 pt-5"
              contentContainerStyle={{
                paddingBottom: footer ? 20 : inset.bottom + 32,
              }}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </SheetScrollView>
            {!!footer && (
              <View
                className="border-t border-nebula-border bg-nebula-bg px-screen pt-3"
                style={{ paddingBottom: Math.max(inset.bottom, 14) }}
              >
                {footer}
              </View>
            )}
          </View>
        </BottomSheet>
      </View>
    </SheetContext.Provider>
  );
}
export function ActionSheet({
  open,
  onClose,
  header,
  children,
}: {
  open: boolean;
  onClose: () => void;
  header: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<BottomSheetModal>(null);
  const inset = useSafeAreaInsets();
  useEffect(() => {
    if (open) ref.current?.present();
    else ref.current?.dismiss();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      ref.current?.dismiss();
      return true;
    });
    return () => sub.remove();
  }, [open]);
  return (
    <BottomSheetModal
      ref={ref}
      accessible={false}
      accessibilityRole="none"
      snapPoints={["55%"]}
      enableDynamicSizing={false}
      onDismiss={onClose}
      backdropComponent={backdrop}
      handleIndicatorStyle={{ backgroundColor: palette.muted, width: 40 }}
      backgroundStyle={backgroundStyle}
      topInset={inset.top + 8}
    >
      <SheetContext.Provider value={true}>
        <View className="flex-1">
          <View
            testID="sheet-header"
            className="border-b border-nebula-border px-5 pb-4 pt-1"
          >
            {header}
          </View>
          <SheetScrollView
            className="flex-1"
            contentContainerClassName="gap-5 px-5 pt-5"
            contentContainerStyle={{ paddingBottom: inset.bottom + 24 }}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </SheetScrollView>
        </View>
      </SheetContext.Provider>
    </BottomSheetModal>
  );
}
