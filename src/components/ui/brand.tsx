import { Gradient } from "@/components/ui/gradient";
import { View } from "react-native";

export function Orb({ size = 96 }: { size?: number }) {
  return (
    <View
      className="items-center justify-center rounded-full border border-[#584075]"
      style={{ width: size, height: size }}
    >
      <View
        className="absolute rounded-full border border-[#493259]"
        style={{ width: size * 0.68, height: size * 0.68 }}
      />
      <Gradient
        colors={["#ECE2FF", "#AE82FC", "#5D24B8"]}
        className="rounded-full"
        style={{
          width: size * 0.36,
          height: size * 0.36,
          boxShadow: "0 0 35px #8146E980",
        }}
      />
      <View
        className="absolute bottom-0 h-[7px] w-[7px] rounded-full bg-[#D3BEFF]"
        style={{ left: size * 0.55, boxShadow: "0 0 12px #B79CFF" }}
      />
    </View>
  );
}
