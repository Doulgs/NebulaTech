import { FormPage } from "@/components/layout/form-page";
import { closeSheetRoute } from "@/components/layout/navigation";
import { BackTitle } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/surface";
import { ErrorText } from "@/components/ui/state-views";
import { Field } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { T } from "@/components/ui/text";
import { palette } from "@/theme/colors";
import { useFinance } from "@/hooks/use-finance";
import { color, parseMoney } from "@/utils/finance";
import { useState } from "react";
import { Pressable, View } from "react-native";

const swatches = [
  { hue: 295, label: "Violeta" },
  { hue: 250, label: "Azul" },
  { hue: 200, label: "Ciano" },
  { hue: 160, label: "Verde-água" },
  { hue: 110, label: "Verde" },
  { hue: 70, label: "Amarelo" },
  { hue: 20, label: "Coral" },
  { hue: 340, label: "Rosa" },
];
export function NewCategory() {
  const { data, save } = useFinance();
  const [name, setName] = useState(""),
    [budget, setBudget] = useState(""),
    [h, setH] = useState(295),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit() {
    setError("");
    if (name.trim().length < 2) return setError("Dê um nome à categoria.");
    if (
      Object.values(data.categories).some(
        (c) => c.label.toLowerCase() === name.trim().toLowerCase(),
      )
    )
      return setError("Já existe uma categoria com este nome.");
    const value = budget ? parseMoney(budget) : 0;
    if (!Number.isFinite(value) || value < 0)
      return setError("Informe um orçamento válido.");
    setBusy(true);
    try {
      const id = "c" + Date.now();
      await save((d) => ({
        ...d,
        categories: {
          ...d.categories,
          [id]: {
            label: name.trim(),
            h,
            icon: "M3 12V4h8l10 10-8 8zM7 7h.1",
            total: 0,
            budget: value,
          },
        },
        expenseCategories: [...d.expenseCategories, id],
      }));
      closeSheetRoute();
    } catch {
      setError("Não foi possível salvar a categoria. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <FormPage
      header={
        <BackTitle
          title="Nova categoria"
          subtitle="Organize seus gastos com nome, cor e orçamento"
        />
      }
      footer={
        <>
          <ErrorText text={error} />
          <Button
            variant="neutral"
            onPress={submit}
            disabled={busy || name.trim().length < 2}
          >
            {busy ? "Salvando…" : "Criar categoria"}
          </Button>
        </>
      }
    >
      <Card
        className="items-center p-[26px]"
        style={{ backgroundColor: color(h) + "15" }}
      >
        <Icon name="tag" tint={color(h)} size={32} />
        <T size={20} bold>
          {name || "Nova categoria"}
        </T>
      </Card>
      <Field
        label="Nome da categoria"
        placeholder="Ex.: Educação"
        value={name}
        onChangeText={setName}
        maxLength={60}
      />
      <Field
        label="Orçamento mensal (R$)"
        placeholder="0,00"
        keyboardType="decimal-pad"
        value={budget}
        onChangeText={(v) => setBudget(v.replace(/[^\d,.]/g, ""))}
      />
      <T muted size={12}>
        Cor
      </T>
      <View className="flex-row flex-wrap gap-1">
        {swatches.map(({ hue, label }) => (
          <Pressable
            key={hue}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: h === hue }}
            onPress={() => setH(hue)}
            className="h-11 w-11 items-center justify-center rounded-full active:opacity-70"
          >
            <View
              className="h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: color(hue) }}
            >
              {h === hue && <Icon name="check" size={17} tint={palette.ink} />}
            </View>
          </Pressable>
        ))}
      </View>
    </FormPage>
  );
}
