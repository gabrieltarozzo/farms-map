import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

function getHostFromExpo(): string | null {
  // SDK 51+: hostUri (ex.: "192.168.0.209:8081" ou "localhost:8081")
  const hostUri =
    (Constants as any)?.expoConfig?.hostUri ??
    (Constants as any)?.manifest?.debuggerHost ?? // fallback SDKs antigos
    "";

  if (!hostUri) return null;
  const host = hostUri.split(":")[0]; // pega só o hostname
  return host || null;
}

function resolveHost(): string {
  // 1) se o usuário setou uma URL fixa, use-a (incluindo http:// e /api)
  const fixed = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (fixed) return fixed; // ex: http://192.168.0.209:8000/api

  const port = process.env.EXPO_PUBLIC_API_PORT?.trim() || "8000";
  const expoHost = getHostFromExpo();

  // Web (no browser): usa o host atual
  if (Platform.OS === "web") {
    const h = typeof window !== "undefined" ? window.location.hostname : "127.0.0.1";
    return `http://${h}:${port}/api`;
  }

  // iOS simulador ou device físico abre via Metro em IP/LAN
  if (Platform.OS === "ios") {
    // simulador costuma resolver 127.0.0.1; device físico -> IP da máquina
    const host = expoHost || "127.0.0.1";
    return `http://${host}:${port}/api`;
  }

  // Android: distinguir emulador vs device físico
  if (Platform.OS === "android") {
    // Se o Metro expõe 'localhost' ou '127.0.0.1', estamos no emulador.
    // Emulador acessa o host via 10.0.2.2
    if (!expoHost || expoHost === "localhost" || expoHost === "127.0.0.1") {
      return `http://10.0.2.2:${port}/api`;
    }
    // Caso contrário, é IP da sua máquina (rodando no celular físico)
    return `http://${expoHost}:${port}/api`;
  }

  // fallback
  return `http://127.0.0.1:${port}/api`;
}

export const api = axios.create({
  baseURL: resolveHost(),
  timeout: 8000,
});

export type Farm = {
  id?: number;
  name: string;
  crop?: string | null;
  area_ha?: number | null;
  lat: number;
  lng: number;
  city?: string | null;
  state?: string | null;
  owner?: string | null;
};

export const listFarms = () => api.get<Farm[]>("/farms").then(r => r.data);
