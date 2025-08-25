import { Platform, NativeModules } from "react-native";
import Config from "react-native-config";

function getHostFromBundle(): string | null {
  try {
    const url: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
    if (!url) return null;
    const host = url.split("://")[1]?.split("/")[0]?.split(":")[0];
    return host || null;
  } catch { return null; }
}
export function resolveBaseUrl(): string {
  const fromEnv = (Config.API_URL || "").trim();
  if (fromEnv) return fromEnv;
  const port = "8000";
  const host = getHostFromBundle();
  if (Platform.OS === "android") {
    if (!host || host === "localhost" || host === "127.0.0.1") return `http://10.0.2.2:${port}/api`;
    return `http://${host}:${port}/api`;
  }
  return `http://${host || "127.0.0.1"}:${port}/api`;
}
export const BASE_URL = resolveBaseUrl();
