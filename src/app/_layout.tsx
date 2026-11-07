import "../global.css";
import { FinanceGate } from "@/components/providers/finance-gate";
import { queryClient } from "@/services/query-client";
import { palette } from "@/theme/colors";
import {
  Manrope_500Medium,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
} from "@expo-google-fonts/space-grotesk";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, ThemeProvider } from "expo-router";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
const GestureRoot = cssInterop(GestureHandlerRootView, { className: "style" });
const sheetOptions = {
  presentation: "transparentModal" as const,
  animation: "fade" as const,
  contentStyle: { backgroundColor: "transparent" },
};
export default function Layout() {
  const [loaded, error] = useFonts({
    Manrope_500Medium,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
  });
  if (!loaded && !error)
    return (
      <View className="flex-1 justify-center bg-nebula-bg">
        <ActivityIndicator color="#B79CFF" />
      </View>
    );
  return (
    <GestureRoot className="flex-1">
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={DarkTheme}>
            <FinanceGate>
              <BottomSheetModalProvider>
                <StatusBar style="light" />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: palette.bg },
                  }}
                >
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(main)" />
                  <Stack.Screen name="add" options={sheetOptions} />
                  <Stack.Screen name="scheduled" options={sheetOptions} />
                  <Stack.Screen name="new-category" options={sheetOptions} />
                  <Stack.Screen
                    name="transaction/[id]"
                    options={sheetOptions}
                  />
                </Stack>
              </BottomSheetModalProvider>
            </FinanceGate>
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureRoot>
  );
}
