import { twMerge } from "tailwind-merge";
export const cn = (...values: (string | undefined | false)[]) =>
  twMerge(values.filter(Boolean).join(" "));
