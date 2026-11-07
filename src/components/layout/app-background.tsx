import { View } from "react-native";
import { Gradient } from "@/components/ui/gradient";

export function AppBackground() {
  return (
    <View pointerEvents="none" className="absolute inset-0">
      <Gradient
        colors={["#100B1C", "#170E29", "#0D0916", "#07060C"]}
        locations={[0, 0.28, 0.65, 1]}
        className="absolute inset-0"
      />
      <Gradient
        colors={["#652BAB26", "#39215F12", "#100B1C00"]}
        start={{ x: 0, y: 0.35 }}
        end={{ x: 1, y: 0.7 }}
        className="absolute inset-0"
      />
    </View>
  );
}
