import { FormPage } from "@/components/layout/form-page";
import { closeSheetRoute } from "@/components/layout/navigation";
import { BackTitle } from "@/components/layout/screen";
import { Button, IconButton } from "@/components/ui/button";
import { Chip, Chips } from "@/components/ui/chip";
import { Field } from "@/components/ui/field";
import { ErrorText } from "@/components/ui/state-views";
import { Card, Row } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import { useFinance } from "@/hooks/use-finance";
import { seed } from "@/mock";
import type { Kind, Recurrence, Transaction } from "@/types";
import { addDate, color, parseMoney, recurrenceLabels, shortDate } from "@/utils/finance";
import { useState } from "react";
export function AddTransaction() {
  const { data, save } = useFinance();
  const [type, setType] = useState<Kind>("out"),
    [amount, setAmount] = useState(""),
    [description, setDescription] = useState(""),
    [cat, setCat] = useState("mercado"),
    [member, setMember] = useState("Douglas"),
    [recur, setRecur] = useState<Recurrence>("none"),
    [count, setCount] = useState(12),
    [date, setDate] = useState(seed.today),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const categories = type === "in" ? ["renda"] : type === "tr" ? ["transf"] : data.expenseCategories;
  async function submit() {
    setError("");
    const n = parseMoney(amount);
    if (!Number.isFinite(n) || n <= 0) return setError("Informe um valor maior que zero, como 123,45.");
    if (!description.trim()) return setError("Adicione uma descrição.");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      isNaN(new Date(date + "T12:00").getTime()) ||
      addDate(date, "none", 0) !== date
    )
      return setError("Informe uma data válida no formato AAAA-MM-DD.");
    setBusy(true);
    try {
      const id = Date.now(),
        quantity = recur === "none" ? 1 : count;
      const list: Transaction[] = Array.from({ length: quantity }, (_, i) => ({
        id: id + i,
        name: description.trim(),
        cat,
        date: addDate(date, recur, i),
        time: "21:30",
        amount: type === "in" ? n : -n,
        type,
        account: "Nebula Conta",
        member,
        recur: recur === "none" ? null : recur,
        recurIdx: i + 1,
        recurTotal: quantity,
      }));
      await save((d) => ({ ...d, transactions: [...list, ...d.transactions] }));
      closeSheetRoute();
    } catch {
      setError("Não foi possível salvar. Confira os dados e tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <FormPage header={<BackTitle title="Nova transação" subtitle="Mais um movimento na sua órbita." />}>
      <Row>
        {[
          ["out", "Despesa"],
          ["in", "Receita"],
          ["tr", "Transf."],
        ].map(([id, label]) => (
          <Chip
            key={id}
            label={label}
            active={type === id}
            onPress={() => {
              setType(id as Kind);
              setCat(id === "in" ? "renda" : id === "tr" ? "transf" : "mercado");
            }}
          />
        ))}
      </Row>
      <Field
        label="Valor (R$)"
        placeholder="0,00"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={(v) => setAmount(v.replace(/[^\d,.]/g, ""))}
        className="font-display text-[32px] min-h-[76px]"
      />
      <Field
        label="Descrição"
        placeholder="Ex.: Compras do mês"
        value={description}
        onChangeText={setDescription}
        maxLength={120}
      />
      <T size={12} muted>
        Categoria
      </T>
      <Chips>
        {categories.map((id) => (
          <Chip
            key={id}
            label={data.categories[id].label}
            active={cat === id}
            dot={color(data.categories[id].h)}
            onPress={() => setCat(id)}
          />
        ))}
      </Chips>
      <Field
        label="Data (AAAA-MM-DD)"
        placeholder="2026-10-19"
        value={date}
        onChangeText={setDate}
        autoCapitalize="none"
      />
      <T muted size={12}>
        Lançado por
      </T>
      <Chips>
        {seed.members.map((m) => (
          <Chip key={m.id} label={m.first} active={member === m.id} onPress={() => setMember(m.id)} />
        ))}
      </Chips>
      <T muted size={12}>
        Recorrência
      </T>
      <Chips>
        {Object.entries(recurrenceLabels).map(([id, label]) => (
          <Chip key={id} label={label} active={recur === id} onPress={() => setRecur(id as Recurrence)} />
        ))}
      </Chips>
      {recur !== "none" && (
        <Card>
          <Row className="justify-between">
            <IconButton name="back" label="Diminuir repetições" onPress={() => setCount(Math.max(2, count - 1))} />
            <T bold>Repetir {count} vezes</T>
            <IconButton name="plus" label="Aumentar repetições" onPress={() => setCount(Math.min(36, count + 1))} />
          </Row>
          <T muted size={11}>
            Próximas:{" "}
            {[1, 2, 3]
              .slice(0, count - 1)
              .map((i) => shortDate(addDate(date, recur, i)))
              .join(", ")}
          </T>
        </Card>
      )}
      <T muted size={10}>
        Conta: Nebula Conta · lançamentos após 19/10/2026 ficam agendados na demonstração.
      </T>
      <ErrorText text={error} />
      <Button onPress={submit} disabled={busy}>
        {busy ? "Salvando…" : "Salvar transação"}
      </Button>
      <Button secondary onPress={() => closeSheetRoute()}>
        Cancelar
      </Button>
    </FormPage>
  );
}
