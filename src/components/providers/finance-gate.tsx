import { Button } from "@/components/ui/button";
import { Orb } from "@/components/ui/brand";
import { T } from "@/components/ui/text";
import { useFinanceQuery } from "@/hooks/use-finance";
import { palette } from "@/theme/colors";
import type { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";

export function FinanceGate({ children }: { children: ReactNode }) {
  const query = useFinanceQuery();
  if (!query.data)
    return (
      <View className="flex-1 items-center justify-center gap-6 bg-nebula-bg px-8">
        <Orb size={72} />
        {query.isError ? (
          <>
            <T bold>Não foi possível abrir seus dados</T>
            <T muted className="text-center">
              Confira o armazenamento do dispositivo e tente novamente.
            </T>
            <Button
              onPress={() => {
                void query.refetch();
              }}
            >
              Tentar novamente
            </Button>
          </>
        ) : (
          <>
            <ActivityIndicator color={palette.purple} />
            <T muted>Organizando sua órbita…</T>
          </>
        )}
      </View>
    );
  return children;
}
