import { SheetContext } from "@/components/layout/sheet-context";
import { cn } from "@/theme/classes";
import { palette } from "@/theme/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import { useContext } from "react";
import { Platform, TextInput, View, type TextInputProps } from "react-native";
import { Icon } from "./icon";
import { T } from "./text";

const SheetInput = cssInterop(BottomSheetTextInput, { className: "style" });

export function Field({
  label,
  className,
  variant = "default",
  ...props
}: TextInputProps & {
  label?: string;
  className?: string;
  variant?: "default" | "search" | "amount";
}) {
  const inSheet = useContext(SheetContext);
  const Input = inSheet && Platform.OS !== "web" ? SheetInput : TextInput;
  const search = variant === "search";
  const amount = variant === "amount";
  return (
    <View className="gap-2">
      {!!label && (
        <T muted size={13} bold>
          {label}
        </T>
      )}
      <View
        className={cn(
          "flex-row items-center gap-2.5 border-nebula-border",
          amount ? "border-b" : "rounded-control border bg-nebula-surface px-4",
          search && "rounded-full bg-nebula-bg",
        )}
      >
        {search && <Icon name="search" size={18} tint={palette.muted} />}
        {amount && (
          <T size={32} bold>
            R$
          </T>
        )}
        <Input
          accessibilityLabel={label || props.placeholder}
          placeholderTextColor={palette.muted}
          selectionColor={palette.purple}
          {...props}
          className={cn(
            "min-h-[50px] flex-1 py-3 font-body text-[15px] text-nebula-text",
            amount && "min-h-[68px] font-display text-[36px]",
            className,
          )}
        />
      </View>
    </View>
  );
}
