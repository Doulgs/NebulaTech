import Animated from "react-native-reanimated";
import { useNavigationScroll } from "@/components/layout/navigation-motion";
import { BackTitle } from "@/components/layout/screen";
import { Button, IconButton } from "@/components/ui/button";
import { ErrorText } from "@/components/ui/state-views";
import { Field } from "@/components/ui/field";
import { Orb } from "@/components/ui/brand";
import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { seed, suggestions } from "@/mock";
import { cn } from "@/theme/classes";
import { answer } from "@/utils/finance";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Chat() {
  const { data, save } = useFinance();
  const [input, setInput] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const scroll = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const inset = useSafeAreaInsets();
  const onScroll = useNavigationScroll();
  async function send(q = input) {
    if (!q.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      await save((d) => ({
        ...d,
        chat: [
          ...d.chat,
          { role: "user", text: q.trim() },
          { role: "assistant", text: answer(q, d) },
        ],
      }));
      setInput("");
    } catch {
      setError("A mensagem não foi salva. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ paddingTop: inset.top }}
        ref={scroll}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() =>
          scroll.current?.scrollToEnd({ animated: true })
        }
        contentContainerClassName="p-[20px] gap-[16px]"
      >
        <View testID="screen-header" className="gap-3 pt-5">
          <BackTitle
            title="Nébula IA"
            subtitle="Assistente financeiro · demo local"
          />
          <Row className="justify-between">
            <T size={10} muted>
              Respostas simuladas com seus dados
            </T>
            <Button
              secondary
              onPress={() => {
                save((d) => ({
                  ...d,
                  chat: [{ ...seed.chat, role: "assistant" }],
                })).catch(() => {});
              }}
            >
              Nova conversa
            </Button>
          </Row>
        </View>
        {data.chat.length === 1 && (
          <View className="items-center pb-[10px]">
            <Orb size={64} />
          </View>
        )}
        {data.chat.map((m, i) => (
          <View
            key={i}
            className={cn(
              "max-w-[94%] p-[16px] rounded-[20px] border-[1px] border-nebula-border",
              m.role === "user" ? "self-end" : "self-start",
              m.role === "user" ? "rounded-br-[5px]" : "rounded-br-[20px]",
              m.role === "assistant" ? "rounded-bl-[5px]" : "rounded-bl-[20px]",
              m.role === "user" ? "bg-[#6C38BD]" : "bg-[#FFFFFF0C]",
            )}
          >
            <T size={13} selectable>
              {m.text}
            </T>
          </View>
        ))}
        {data.chat.length === 1 &&
          suggestions.map((q) => (
            <Button key={q} secondary onPress={() => send(q)}>
              {q}
            </Button>
          ))}
      </Animated.ScrollView>
      <View
        className="px-[20px] pt-[12px] gap-[8px]"
        style={{ paddingBottom: Math.max(inset.bottom, 16) + 100 }}
      >
        <ErrorText text={error} />
        <Row>
          <View className="flex-1">
            <Field
              placeholder="Pergunte sobre suas finanças…"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => send()}
              returnKeyType="send"
            />
          </View>
          <IconButton
            name="arrow"
            label="Enviar mensagem"
            onPress={() => send()}
            active={!!input.trim()}
          />
        </Row>
        {busy && (
          <T muted size={10}>
            Salvando conversa…
          </T>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
