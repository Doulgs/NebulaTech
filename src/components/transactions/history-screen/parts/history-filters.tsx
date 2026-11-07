import { Chip, Chips } from "@/components/ui/chip";
import { Field } from "@/components/ui/field";
import { seed } from "@/mock";
import { color } from "@/utils/finance";

import { useHistory } from "@/hooks/use-history";

export function HistoryFilters({
  model,
}: {
  model: ReturnType<typeof useHistory>;
}) {
  const {
    data,
    type,
    setType,
    cat,
    setCat,
    member,
    setMember,
    query,
    setQuery,
  } = model;
  return (
    <>
      <Field
        placeholder="Buscar transação ou categoria"
        value={query}
        onChangeText={setQuery}
      />
      <Chips>
        {[
          ["all", "Todas"],
          ["in", "Entradas"],
          ["out", "Saídas"],
          ["tr", "Transf."],
        ].map(([id, label]) => (
          <Chip
            key={id}
            label={label}
            active={type === id}
            onPress={() => setType(id)}
          />
        ))}
      </Chips>
      <Chips>
        <Chip
          label="Todas categorias"
          active={!cat}
          onPress={() => setCat("")}
        />
        {[...data.expenseCategories, "renda", "transf"].map((id) => (
          <Chip
            key={id}
            label={data.categories[id].label}
            dot={color(data.categories[id].h)}
            active={cat === id}
            onPress={() => setCat(id)}
          />
        ))}
      </Chips>
      <Chips>
        <Chip label="Todos" active={!member} onPress={() => setMember("")} />
        {seed.members.map((m) => (
          <Chip
            key={m.id}
            label={m.first}
            active={member === m.id}
            onPress={() => setMember(m.id)}
          />
        ))}
      </Chips>
    </>
  );
}
