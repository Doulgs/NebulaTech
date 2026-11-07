import { View } from "react-native";

import { palette } from "@/theme/colors";
export function Progress({
  value,
  tint = palette.purple,
}: {
  value: number;
  tint?: string;
}) {
  return (
    <View className="h-[5px] overflow-hidden rounded bg-[#2A2434]">
      <View
        className="h-full rounded"
        style={{
          width: `${Math.min(100, Math.max(0, value * 100))}%`,
          backgroundColor: tint,
        }}
      />
    </View>
  );
}
