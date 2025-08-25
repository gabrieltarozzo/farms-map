import { View, Text, Image, Platform } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

const queryClient = new QueryClient();

type Farm = {
  id: number;
  name: string;
  crop?: string | null;
  area_ha?: number | null;
  lat: number;
  lng: number;
  owner?: string | null;
};

// ---- BASE_URL: emulador vs device físico (Expo dev client) ----
function getHostFromExpo(): string | null {
  const hostUri =
    (Constants as any)?.expoConfig?.hostUri ??
    (Constants as any)?.manifest?.debuggerHost ?? "";
  const host = hostUri.split(":")[0];
  return host || null;
}

function resolveBaseUrl(): string {
  const forced = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (forced) return forced; // ex: http://192.168.0.209:8000/api

  const port = "8000";
  const host = getHostFromExpo();

  if (Platform.OS === "android") {
    if (!host || host === "localhost" || host === "127.0.0.1") {
      return `http://10.0.2.2:${port}/api`; // emulador
    }
    return `http://${host}:${port}/api`;      // celular físico (IP do Metro)
  }

  if (Platform.OS === "ios") {
    return `http://${host || "127.0.0.1"}:${port}/api`;
  }

  const wHost = typeof window !== "undefined" ? window.location.hostname : "127.0.0.1";
  return `http://${wHost}:${port}/api`;
}

const BASE_URL = resolveBaseUrl();
const api = axios.create({ baseURL: BASE_URL, timeout: 8000 });
const listFarms = () => api.get<Farm[]>("/farms").then(r => r.data);

function MapScreen() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["farms"],
    queryFn: listFarms,
    retry: 1
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider="google"                 // <- agora Google Maps (funciona no dev-client)
        initialRegion={{
          latitude: -15.9,
          longitude: -48.6,
          latitudeDelta: 4.5,
          longitudeDelta: 4.5,
        }}
        onMapReady={() => console.log("MAP READY")}
      >
        {data?.map(f => (
          <Marker key={f.id} coordinate={{ latitude: f.lat, longitude: f.lng }}>
            <Image source={require("./assets/farm-icon.png")} style={{ width: 36, height: 36 }} />
            <Callout>
              <View style={{ padding: 6, maxWidth: 220 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{f.name}</Text>
                {f.crop && <Text>Cultura: {f.crop}</Text>}
                {f.area_ha != null && <Text>Área: {f.area_ha} ha</Text>}
                {f.owner && <Text>Produtor: {f.owner}</Text>}
                <Text style={{ marginTop: 4, fontSize: 12, opacity: 0.6 }}>
                  {f.lat.toFixed(4)}, {f.lng.toFixed(4)}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Text style={{ position:"absolute", top:10, left:10, backgroundColor:"#fff", padding:6, borderRadius:6 }}>
        {BASE_URL} • farms: {data?.length ?? 0} {isLoading ? "⏳" : isError ? "❌" : "✅"}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MapScreen />
    </QueryClientProvider>
  );
}
