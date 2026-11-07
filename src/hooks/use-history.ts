import { useFinance } from "@/hooks/use-finance";
import { sorted } from "@/utils/finance";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export function useHistory() {
  const { data } = useFinance();
  const params = useLocalSearchParams<{ category?: string; member?: string }>();
  const [type, setType] = useState("all"),
    [cat, setCat] = useState(params.category || ""),
    [member, setMember] = useState(params.member || ""),
    [query, setQuery] = useState("");
  const filtered = sorted(data.transactions).filter(
    (t) =>
      (type === "all" || t.type === type) &&
      (!cat || t.cat === cat) &&
      (!member || t.member === member) &&
      (!query ||
        `${t.name} ${data.categories[t.cat]?.label}`
          .toLowerCase()
          .includes(query.toLowerCase())),
  );
  const dates = [...new Set(filtered.map((t) => t.date))];

  return {
    data,
    type,
    setType,
    cat,
    setCat,
    member,
    setMember,
    query,
    setQuery,
    filtered,
    dates,
  };
}
