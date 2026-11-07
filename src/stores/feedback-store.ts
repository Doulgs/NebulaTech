import { create } from "zustand";

/** Transient interface feedback is kept apart from persisted financial data. */
export const useFeedbackStore = create<{
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
}>((set) => ({
  error: "",
  setError: (error) => set({ error }),
  clearError: () => set({ error: "" }),
}));
