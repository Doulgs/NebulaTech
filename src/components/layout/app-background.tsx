import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Gradient } from "@/components/ui/gradient";
import { palette } from "@/theme/colors";

const artworkByPath: Record<string, number> = {
  "/": require("../../../assets/images/andromeda-acesso.jpg"),
  "/chat": require("../../../assets/images/andromeda-assistente.jpg"),
  "/cards": require("../../../assets/images/andromeda-carteira.jpg"),
  "/analytics": require("../../../assets/images/andromeda-analises.jpg"),
  "/history": require("../../../assets/images/andromeda-atividades.jpg"),
};

export function AppBackground({ path }: { path: string }) {
  const artwork = artworkByPath[path];
  return (
    <View
      pointerEvents="none"
      className="absolute inset-x-0 top-0 h-[290px] overflow-hidden bg-nebula-heroBase"
    >
      {artwork && (
        <Image
          source={artwork}
          contentFit="cover"
          contentPosition="top"
          accessible={false}
          style={[StyleSheet.absoluteFill, { opacity: 0.56 }]}
        />
      )}
      <Gradient
        colors={["transparent", palette.bg]}
        locations={[0, 1]}
        className="absolute inset-0"
      />
    </View>
  );
}
