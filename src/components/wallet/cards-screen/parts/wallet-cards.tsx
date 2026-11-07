import { Chip, Chips } from "@/components/ui/chip";
import { Icon } from "@/components/ui/icon";
import { NumberText, T } from "@/components/ui/text";
import { Row } from "@/components/ui/surface";
import { Gradient } from "@/components/ui/gradient";
import { seed } from "@/mock";
import { cn } from "@/theme/classes";
import { Pressable, ScrollView, View } from "react-native";

import { useWallet } from "@/hooks/use-wallet";

export function WalletCards({
  model,
}: {
  model: ReturnType<typeof useWallet>;
}) {
  const { data, index, setIndex, setConfirm, setError } = model;
  const gradients: [string, string, string][] = [
    ["#5B328E", "#26113E", "#160D26"],
    ["#214276", "#282A5B", "#11152E"],
    ["#6F275B", "#3C1B4B", "#200E2B"],
  ];
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-[12px]"
      >
        {seed.cards.map((c, i) => (
          <Pressable
            key={c.name}
            accessibilityRole="button"
            accessibilityLabel={`Selecionar ${c.name}`}
            onPress={() => {
              setIndex(i);
              setConfirm(false);
              setError("");
            }}
          >
            <Gradient
              colors={gradients[i]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              className={cn(
                "w-[295px] h-[188px] rounded-[25px] p-[22px] border-[1px] justify-between overflow-hidden",
                index === i ? "border-[#B79CFF88]" : "border-[#FFFFFF1F]",
                index === i ? "opacity-[1]" : "opacity-[0.65]",
              )}
            >
              <View className="absolute w-[180px] h-[180px] border-[1px] border-[#FFFFFF16] rounded-[90px] right-[-50px] top-[-50px]" />
              <Row className="justify-between">
                <T size={21} bold className="font-display">
                  nébula
                </T>
                <T size={10}>{c.tier.toUpperCase()}</T>
              </Row>
              <Row>
                <View className="w-[31px] h-[24px] border-[1px] border-[#D7BED288] rounded-[6px] bg-[#B19BAF66]" />
                <Icon name={data.locked[c.name] ? "lock" : "cards"} size={21} />
              </Row>
              <NumberText size={18}>•••• •••• •••• {c.last}</NumberText>
              <Row className="justify-between">
                <T size={9}>{c.holder}</T>
                <T size={10}>{data.locked[c.name] ? "BLOQUEADO" : c.exp}</T>
              </Row>
            </Gradient>
          </Pressable>
        ))}
      </ScrollView>
      <Chips>
        {seed.cards.map((c, i) => (
          <Chip
            key={c.name}
            label={c.name}
            active={i === index}
            onPress={() => {
              setIndex(i);
              setConfirm(false);
            }}
          />
        ))}
      </Chips>
    </>
  );
}
