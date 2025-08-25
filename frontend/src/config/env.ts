import { Platform, NativeModules } from "react-native";
import Config from "react-native-config";

function getHostFromBundle(): string | null {
  try {
    const url: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
    if (!url) return null;
    const host = url.split("://")[1]?.split("/")[0]?.split(":")[0];
    return host || null;
  } catch {
    return null;
  }
}

export function resolveBaseUrl(): string {
  // 1) .env (build-time)
  const fromEnv = (Config.API_URL ?? "").trim();
  if (fromEnv) {
    // normaliza para não ficar com barra dupla quando usar "/farms"
    return fromEnv.replace(/\/+$/, "");
  }

  // 2) fallback DEV (emulador / device na mesma rede)
  const port = "8000";
  const host = getHostFromBundle();

  if (Platform.OS === "android") {
    if (!host || host === "localhost" || host === "127.0.0.1") {
      return `http://10.0.2.2:${port}/api`; // emulador Android
    }
    return `http://${host}:${port}/api`;      // device físico
  }

  return `http://${host || "127.0.0.1"}:${port}/api`; // iOS/others
}

export const BASE_URL = resolveBaseUrl();