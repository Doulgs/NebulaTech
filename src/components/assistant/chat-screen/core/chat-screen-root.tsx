import { IconButton } from "@/components/ui/button";
import { Chip, Chips } from "@/components/ui/chip";
import { ErrorText } from "@/components/ui/state-views";
import { Field } from "@/components/ui/field";
import { Orb } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { Card, Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { seed, suggestions } from "@/mock";
import { cn } from "@/theme/classes";
import { palette } from "@/theme/colors";
import { answer } from "@/utils/finance";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Chat() {
  const { data, save } = useFinance();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scroll = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const inset = useSafeAreaInsets();

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

  async function reset() {
    setBusy(true);
    setError("");
    try {
      await save((d) => ({
        ...d,
        chat: [{ ...seed.chat, role: "assistant" }],
      }));
      setInput("");
    } catch {
      setError("Não foi possível iniciar uma conversa. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <View
        testID="screen-header"
        className="gap-4 border-b border-nebula-border px-screen pb-4"
        style={{ paddingTop: inset.top + 16 }}
      >
        <Row className="justify-between">
          <IconButton
            name="close"
            label="Fechar assistente"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/home")
            }
          />
          <View className="flex-1 items-center">
            <T bold size={16}>
              Andromeda IA
            </T>
            <T muted size={11}>
              Respostas simuladas
            </T>
          </View>
          <IconButton
            name="plus"
            label="Nova conversa"
            disabled={busy || data.chat.length === 1}
            onPress={reset}
          />
        </Row>
      </View>
      <ScrollView
        className="flex-1"
        ref={scroll}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() =>
          scroll.current?.scrollToEnd({ animated: data.chat.length > 1 })
        }
        contentContainerClassName="gap-6 px-screen py-6"
      >
        {data.chat.length === 1 && (
          <Card tone="orbital" className="items-center gap-3 py-5">
            <Orb size={76} />
            <T bold size={26} className="text-center">
              Como posso ajudar?
            </T>
          </Card>
        )}
        {data.chat.map((message, index) => {
          const user = message.role === "user";
          return (
            <View
              key={index}
              className={cn(
                "gap-2 rounded-card border border-nebula-border px-4 py-3",
                user
                  ? "max-w-[90%] self-end bg-nebula-raised"
                  : "bg-nebula-surface",
              )}
            >
              {!user && (
                <Row className="gap-1.5">
                  <Icon name="chat" size={16} tint={palette.purple} />
                  <T size={11} bold className="text-nebula-purple">
                    ANDROMEDA
                  </T>
                </Row>
              )}
              <T size={15} selectable>
                {user
                  ? message.text
                  : message.text.replace("Nébula IA", "Andromeda IA")}
              </T>
            </View>
          );
        })}
      </ScrollView>
      <View
        className="gap-3 border-t border-nebula-border bg-nebula-bg px-screen pt-3"
        style={{ paddingBottom: Math.max(inset.bottom, 14) }}
      >
        {data.chat.length === 1 && (
          <Chips>
            {suggestions.map((question) => (
              <Chip
                key={question}
                label={question}
                onPress={() => send(question)}
              />
            ))}
          </Chips>
        )}
        <ErrorText text={error} />
        <Row className="gap-2">
          <View className="flex-1">
            <Field
              placeholder="Pergunte à Andromeda…"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => send()}
              returnKeyType="send"
            />
          </View>
          <IconButton
            name="send"
            label="Enviar mensagem"
            onPress={() => send()}
            active={!!input.trim()}
            disabled={!input.trim() || busy}
          />
        </Row>
        {busy && (
          <T muted size={11}>
            Salvando conversa…
          </T>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
