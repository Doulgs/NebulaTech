import { NavigationMotionProvider } from "@/components/layout/navigation-motion";
import { AppBackground } from "@/components/layout/app-background";
import { AppNavigation } from "@/components/layout/app-navigation";
import { T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { Redirect, Slot } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainLayout() {
  const { data, error, clearError } = useFinance();
  const inset = useSafeAreaInsets();
  if (!data.session) return <Redirect href="/" />;
  return (
    <NavigationMotionProvider>
      <View className="flex-1 bg-nebula-bg">
        <AppBackground />
        <View className="w-full max-w-[620px] flex-1 self-center">
          <Slot />
          {!!error && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar aviso"
              onPress={clearError}
              className="absolute left-4 right-4 z-[99] rounded-2xl border border-nebula-red/30 bg-[#422534] p-4"
              style={{ top: inset.top + 8 }}
            >
              <T size={12}>{error}</T>
            </Pressable>
          )}
          <AppNavigation />
        </View>
      </View>
    </NavigationMotionProvider>
  );
}
