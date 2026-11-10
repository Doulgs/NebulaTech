import { palette } from "@/theme/colors";
import { Icon } from "./icon";
import { View } from "react-native";
import { T } from "./text";
export function ErrorText({ text }: { text: string }) {
  return text ? (
    <T size={12} className="text-nebula-red" selectable>
      {text}
    </T>
  ) : null;
}
export function Empty({
  text = "Nenhuma transação encontrada.",
  detail,
}: {
  text?: string;
  detail?: string;
}) {
  return (
    <View className="items-center gap-2 px-4 py-10">
      <Icon name="search" tint={palette.purple} />
      <T bold size={16} className="text-center">
        {text}
      </T>
      {!!detail && (
        <T muted size={13} className="text-center">
          {detail}
        </T>
      )}
    </View>
  );
}
