import { AppBackground } from "@/components/layout/app-background";
import { Orb } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ErrorText } from "@/components/ui/state-views";
import { Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { validEmail } from "@/utils/finance";
import { Redirect } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Auth() {
  const { data, save } = useFinance();
  const [mode, setMode] = useState<"in" | "up" | "reset">("in"),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [name, setName] = useState(""),
    [error, setError] = useState(""),
    [note, setNote] = useState(""),
    [busy, setBusy] = useState(false);
  const inset = useSafeAreaInsets();
  if (data.session) return <Redirect href="/home" />;
  async function submit(demo = false) {
    setError("");
    setNote("");
    if (!demo) {
      if (mode === "up" && name.trim().length < 2)
        return setError("Informe seu nome completo.");
      if (!validEmail(email)) return setError("Digite um e-mail válido.");
      if (mode !== "reset" && password.length < 6)
        return setError("A senha precisa ter ao menos 6 caracteres.");
      if (mode === "reset") {
        setNote(
          "Modo demonstração: nenhuma mensagem é enviada. Use “Explorar demonstração” para entrar.",
        );
        return;
      }
    }
    setBusy(true);
    try {
      await save((d) => ({
        ...d,
        session: {
          name: name.trim() || "Douglas Domiciano",
          email: demo ? "Douglas@nebula.demo" : email.trim(),
        },
      }));
    } catch {
      setError("Não foi possível salvar o acesso local. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <View className="flex-1 bg-nebula-bg">
      <AppBackground path="/" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="p-[26px] w-[100%] max-w-[440px] self-center gap-[18px]"
          contentContainerStyle={{
            paddingTop: Math.max(inset.top + 30, 64),
            paddingBottom: inset.bottom + 26,
          }}
        >
          <View className="items-center gap-4 pb-4">
            <Orb size={78} />
            <View className="items-center gap-[8px]">
              <T size={34} bold className="font-display tracking-[-1px]">
                Andromeda
              </T>
              <T size={14} muted className="text-center">
                Suas contas, seus gastos e sua família em um só lugar.
              </T>
            </View>
          </View>
          {mode !== "reset" && (
            <SegmentedControl
              label="Acesso"
              value={mode}
              options={[
                { value: "in", label: "Entrar" },
                { value: "up", label: "Criar conta" },
              ]}
              onChange={(nextMode) => {
                setMode(nextMode);
                setError("");
                setNote("");
              }}
            />
          )}
          {mode === "reset" && (
            <T bold size={20}>
              Recuperar acesso
            </T>
          )}
          {mode === "up" && (
            <Field
              label="Nome completo"
              value={name}
              onChangeText={setName}
              placeholder="Como devemos te chamar?"
              autoComplete="name"
            />
          )}
          <Field
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="voce@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {mode !== "reset" && (
            <Field
              label="Senha"
              value={password}
              onChangeText={setPassword}
              placeholder="Mínimo de 6 caracteres"
              secureTextEntry
              autoComplete={mode === "up" ? "new-password" : "current-password"}
            />
          )}
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setMode(mode === "reset" ? "in" : "reset");
              setError("");
              setNote("");
            }}
            className="self-end py-[2px]"
          >
            <T size={12} className="text-nebula-purple">
              {mode === "reset" ? "Voltar para entrar" : "Esqueci minha senha"}
            </T>
          </Pressable>
          <ErrorText text={error} />
          {!!note && (
            <T size={12} className="text-nebula-purple">
              {note}
            </T>
          )}
          <Button disabled={busy} onPress={() => submit()}>
            {busy
              ? "Abrindo…"
              : mode === "up"
                ? "Criar minha conta"
                : mode === "reset"
                  ? "Recuperar acesso"
                  : "Entrar"}
          </Button>
          <Row className="my-[4px]">
            <View className="flex-1 h-[1px] bg-nebula-border" />
            <T muted size={11}>
              ou continue com
            </T>
            <View className="flex-1 h-[1px] bg-nebula-border" />
          </Row>
          <Row>
            <View className="flex-1">
              <Button secondary onPress={() => submit(true)}>
                G Google · demo
              </Button>
            </View>
            <View className="flex-1">
              <Button secondary onPress={() => submit(true)}>
                ● Apple · demo
              </Button>
            </View>
          </Row>
          <Pressable
            accessibilityRole="button"
            onPress={() => submit(true)}
            className="items-center p-[5px]"
          >
            <T size={12} className="text-nebula-purple">
              Explorar demonstração
            </T>
          </Pressable>
          <T muted size={10} className="text-center leading-[17px]">
            Demonstração local. Use qualquer e-mail válido e senha com 6
            caracteres. Não use sua senha real. Nenhum dado é enviado a um
            servidor.
          </T>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
