import { BackTitle, Page } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { NativePreference } from "@/components/ui/native-preference";
import { Section } from "@/components/ui/section";
import { ErrorText } from "@/components/ui/state-views";
import { Card, Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { palette } from "@/theme/colors";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

const destinations = [
  { route: "/members", icon: "members", label: "Membros" },
  { route: "/categories", icon: "categories", label: "Categorias" },
  { route: "/scheduled", icon: "calendar", label: "Agendados" },
] as const;

export default function ProfileScreenRoot() {
  const { data, save } = useFinance();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const name = data.session?.name ?? "";
  async function setPrivacy(hide: boolean) {
    setBusy(true);
    setError("");
    try {
      await save((current) => ({ ...current, hide }));
    } catch {
      setError("Não foi possível atualizar a privacidade. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page header={<BackTitle title="Seu perfil" back />}>
      <Card tone="orbital" className="items-center gap-2.5 py-5">
        <View className="mb-1 h-20 w-20 items-center justify-center rounded-full border border-nebula-purple/30 bg-nebula-purple/10">
          <T size={26} bold className="text-nebula-purple">
            {name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </T>
        </View>
        <T bold size={22}>
          {name}
        </T>
        <T muted size={13}>
          {data.session?.email}
        </T>
        <View className="mt-1 rounded-full bg-nebula-purple/10 px-3 py-1.5">
          <T size={11} className="text-nebula-purple">
            Família Domiciano
          </T>
        </View>
      </Card>
      <View className="gap-3">
        <Section title="Organização" />
        <Card className="gap-0 px-3 py-1">
          {destinations.map((item, index) => (
            <Pressable
              key={item.route}
              accessibilityRole="button"
              onPress={() => router.push(item.route)}
              className={
                index > 0 ? "border-t border-nebula-border" : undefined
              }
            >
              <Row className="min-h-14 px-1 py-2">
                <View className="h-8 w-8 items-center justify-center rounded-full bg-nebula-raised">
                  <Icon name={item.icon} size={16} tint={palette.purple} />
                </View>
                <T bold className="flex-1">
                  {item.label}
                </T>
                <Icon name="arrow" size={16} tint={palette.muted} />
              </Row>
            </Pressable>
          ))}
        </Card>
      </View>
      <Section title="Privacidade" />
      <Card className="gap-3">
        <NativePreference
          label="Ocultar valores"
          value={data.hide}
          disabled={busy}
          onValueChange={(value) => {
            void setPrivacy(value);
          }}
        />
        <T muted size={12}>
          Proteja seu saldo e seus lançamentos ao abrir o aplicativo em público.
        </T>
      </Card>
      <Section title="Sobre sua demonstração" />
      <Card>
        <Row>
          <Icon name="lock" tint={palette.purple} />
          <T bold size={14}>
            Dados neste dispositivo
          </T>
        </Row>
        <T muted size={13}>
          Seu app está no modo de demonstração. Não há conexão com bancos,
          autenticação externa ou envio de convites.
        </T>
      </Card>
      <ErrorText text={error} />
      <Button
        secondary
        icon="logout"
        disabled={busy}
        onPress={async () => {
          setBusy(true);
          setError("");
          try {
            await save((current) => ({ ...current, session: null }));
            router.replace("/");
          } catch {
            setError("Não foi possível sair. Tente novamente.");
          } finally {
            setBusy(false);
          }
        }}
      >
        Sair da conta
      </Button>
    </Page>
  );
}
