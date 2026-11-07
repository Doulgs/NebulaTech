import { router } from "expo-router";
export function closeSheetRoute() {
  if (router.canGoBack()) router.back();
  else router.replace("/home");
}
