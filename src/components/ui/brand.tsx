import { Gradient } from "@/components/ui/gradient";
import { View } from "react-native";

export function Stars() {
  return (
    <View pointerEvents="none" className="absolute inset-0">
      <Gradient
        colors={["#21133366", "#09071100", "#180E2433"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />
      {Array.from({ length: 65 }, (_, i) => (
        <View
          key={i}
          className="absolute rounded-sm bg-[#E0D2FF]"
          style={{
            left: `${(i * 61.31) % 100}%`,
            top: `${(i * 31.7) % 100}%`,
            width: i % 9 === 0 ? 2 : 1,
            height: i % 9 === 0 ? 2 : 1,
            opacity: i % 3 === 0 ? 0.5 : 0.2,
          }}
        />
      ))}
    </View>
  );
}
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
