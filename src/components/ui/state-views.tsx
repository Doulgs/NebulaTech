import { palette } from "@/theme/colors";
import { Icon } from "./icon";
import { Card } from "./surface";
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
}: {
  text?: string;
}) {
  return (
    <Card className="items-center gap-3 py-[30px]">
      <Icon name="search" tint={palette.purple} />
      <T muted className="text-center">
        {text}
      </T>
    </Card>
  );
}
