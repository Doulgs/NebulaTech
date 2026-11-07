import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FinanceData } from "../src/types";
import { initialData } from "./index";
const KEY = "@nebula/finance-v1";
export const mockRepository = {
  async load(): Promise<FinanceData> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return initialData();
    const data = JSON.parse(raw);
    if (
      data.version !== 1 ||
      !Array.isArray(data.transactions) ||
      !data.categories
    )
      throw new Error("Os dados locais não puderam ser lidos.");
    return { ...initialData(), ...data };
  },
  async save(data: FinanceData) {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  },
};
