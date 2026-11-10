import { Chip, Chips } from "@/components/ui/chip";
import { Field } from "@/components/ui/field";
import { Card } from "@/components/ui/surface";
import { T } from "@/components/ui/text";
import type { useHistory } from "@/hooks/use-history";
import { seed } from "@/mock";
import { color } from "@/utils/finance";
import { useState } from "react";
import { View } from "react-native";

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
  const [showFilters, setShowFilters] = useState(false);
  const filterCount = Number(!!cat) + Number(!!member);

  return (
    <View className="gap-3">
      <Field
        variant="search"
        placeholder="Buscar transação ou categoria"
        value={query}
        onChangeText={setQuery}
      />
      <Chips>
        <Chip
          label={filterCount ? `Filtros · ${filterCount}` : "Filtros"}
          active={showFilters}
          onPress={() => setShowFilters(!showFilters)}
        />
        {[
          ["all", "Todas"],
          ["in", "Entradas"],
          ["out", "Saídas"],
          ["tr", "Transferências"],
        ].map(([id, label]) => (
          <Chip
            key={id}
            label={label}
            active={type === id}
            onPress={() => setType(id)}
          />
        ))}
      </Chips>
      {showFilters && (
        <Card tone="orbital">
          <T size={14} bold>
            Categoria
          </T>
          <Chips>
            <Chip label="Todas" active={!cat} onPress={() => setCat("")} />
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
          <View className="h-px bg-nebula-border" />
          <T size={14} bold>
            Membro
          </T>
          <Chips>
            <Chip
              label="Todos"
              active={!member}
              onPress={() => setMember("")}
            />
            {seed.members.map((m) => (
              <Chip
                key={m.id}
                label={m.first}
                active={member === m.id}
                onPress={() => setMember(m.id)}
              />
            ))}
          </Chips>
        </Card>
      )}
    </View>
  );
}
