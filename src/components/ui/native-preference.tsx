import { palette } from "@/theme/colors";
import { Host, Switch } from "@expo/ui";

/** Keep the native toolkit self-contained; Host bridges SwiftUI and Compose. */
export function NativePreference({
  label,
  value,
  onValueChange,
  disabled,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Host matchContents colorScheme="dark" seedColor={palette.purple}>
      <Switch
        label={label}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      />
    </Host>
  );
}
