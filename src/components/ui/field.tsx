import { SheetContext } from "@/components/layout/sheet-context";
import { cn } from "@/theme/classes";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import { useContext } from "react";
import { Platform, TextInput, View, type TextInputProps } from "react-native";

import { T } from "./text";
const SheetInput = cssInterop(BottomSheetTextInput, { className: "style" });
export function Field({
  label,
  className,
  ...props
}: TextInputProps & { label?: string; className?: string }) {
  const inSheet = useContext(SheetContext);
  // Native sheet inputs integrate with the OS keyboard. Web uses the browser input.
  const Input = inSheet && Platform.OS !== "web" ? SheetInput : TextInput;
  return (
    <View className="gap-[7px]">
      {!!label && (
        <T muted size={12} bold>
          {label}
        </T>
      )}
      <Input
        accessibilityLabel={label || props.placeholder}
        placeholderTextColor="#756B86"
        {...props}
        className={cn(
          "min-h-[54px] rounded-2xl border border-white/[0.11] bg-white/[0.03] px-4 py-3 font-body text-[14px] text-nebula-text",
          className,
        )}
      />
    </View>
  );
}
