import { BackTitle, Page } from "@/components/layout/screen";
import { Amount } from "@/components/ui/amount";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Section } from "@/components/ui/section";
import { ErrorText } from "@/components/ui/state-views";
import { Card, Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { seed } from "@/mock";
import { palette } from "@/theme/colors";
import { color, isCompleted, money, validEmail } from "@/utils/finance";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
export default function Members() {
  const { data, save } = useFinance();
  const [email, setEmail] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const spent = (id: string) =>
    data.transactions
      .filter((t) => t.member === id && t.type === "out" && isCompleted(t))
      .reduce((s, t) => s - t.amount, 0);
  const total = seed.members.reduce((s, m) => s + spent(m.id), 0);
  async function invite() {
    setError("");
    const value = email.trim().toLowerCase();
    if (!validEmail(value)) return setError("Digite um e-mail válido.");
    if (data.invites.includes(value))
      return setError("Este e-mail já tem um convite pendente.");
    setBusy(true);
    try {
      await save((d) => ({ ...d, invites: [...d.invites, value] }));
      setEmail("");
    } catch {
      setError("Não foi possível salvar o convite. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page
      header={
        <BackTitle
          title="Membros"
          subtitle="Acompanhe os gastos de cada pessoa."
          back
        />
      }
    >
      <Card tone="orbital">
        <T size={12} muted>
          Família Domiciano
        </T>
        <Amount value={total} size={32} />
        <T size={11} muted>
          Despesas nos lançamentos disponíveis
        </T>
        <T size={11}>
          {seed.members.length} ativos · {data.invites.length} convite(s)
        </T>
      </Card>
      {seed.members.map((m) => (
        <Pressable
          accessibilityRole="button"
          key={m.id}
          onPress={() =>
            router.push({ pathname: "/history", params: { member: m.id } })
          }
        >
          <Card className="p-[17px]">
            <Row>
              <View
                className="w-[46px] h-[46px] rounded-[24px] items-center justify-center"
                style={{ backgroundColor: color(m.h) + "55" }}
              >
                <T bold>{m.initials}</T>
              </View>
              <View className="flex-1">
                <T bold size={14}>
                  {m.name}
                  {m.you ? " · Você" : ""}
                </T>
                <T muted size={11}>
                  {m.role}
                </T>
              </View>
              <T className="text-nebula-purple">›</T>
            </Row>
            <Row className="justify-between">
              <Amount value={spent(m.id)} size={20} />
              <T muted size={11}>
                {((spent(m.id) / (total || 1)) * 100).toFixed(1)}% dos gastos
              </T>
            </Row>
            {m.limit && (
              <>
                <Progress
                  value={spent(m.id) / m.limit}
                  tint={spent(m.id) > m.limit ? palette.red : palette.purple}
                />
                <T size={10} muted>
                  Limite mensal:{" "}
                  {data.hide
                    ? "••••"
                    : `${money(spent(m.id))} de ${money(m.limit)}`}
                </T>
              </>
            )}
          </Card>
        </Pressable>
      ))}
      <Section title="Convites pendentes" />
      {data.invites.map((email) => (
        <Card key={email} className="p-[15px] gap-[12px]">
          <T size={12}>{email}</T>
          <Row className="justify-between">
            <T muted size={10}>
              Pendente · simulação local
            </T>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Cancelar convite ${email}`}
              onPress={() => {
                save((d) => ({
                  ...d,
                  invites: d.invites.filter((e) => e !== email),
                })).catch(() => {});
              }}
            >
              <T size={11} className="text-nebula-red">
                Cancelar convite
              </T>
            </Pressable>
          </Row>
        </Card>
      ))}
      <Card>
        <T size={16} bold>
          Convidar um membro
        </T>
        <T muted size={11}>
          O convite ficará salvo neste dispositivo, pronto para a futura
          integração.
        </T>
        <Field
          label="E-mail do convidado"
          placeholder="pessoa@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <ErrorText text={error} />
        <Button disabled={busy} onPress={invite}>
          {busy ? "Salvando…" : "Adicionar convite"}
        </Button>
      </Card>
    </Page>
  );
}
