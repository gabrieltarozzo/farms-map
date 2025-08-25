// App.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Platform, StyleSheet, TouchableOpacity, NativeModules } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Config from "react-native-config";

type Farm = {
  id: number; name: string; crop?: string | null; area_ha?: number | null;
  lat: number | string; lng: number | string; owner?: string | null;
};

// -------- baseURL local/emulador
function getHostFromBundle(): string | null {
  try {
    const scriptURL: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
    if (!scriptURL) return null;
    const hostPort = scriptURL.split("://")[1]?.split("/")[0];
    const host = hostPort?.split(":")[0];
    return host || null;
  } catch { return null; }
}
function resolveBaseUrl(): string {
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
const BASE_URL = resolveBaseUrl();
const api = axios.create({ baseURL: BASE_URL, timeout: 8000 });

const isValidCoord = (x: number) => Number.isFinite(x) && Math.abs(x) <= 180;
const listFarms = async (): Promise<Farm[]> => {
  const r = await api.get<Farm[]>("/farms");
  return (r.data || []).filter(f => isValidCoord(Number(f.lat)) && isValidCoord(Number(f.lng)));
};

const queryClient = new QueryClient();

// ================== UI ==================
function MapScreen() {
  // ✅ Hooks no TOPO
  const mapRef = useRef<MapView>(null);
  const { data: farms = [], isLoading, isError } = useQuery({ queryKey: ["farms"], queryFn: listFarms });
  const [selected, setSelected] = useState<Farm | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (farms.length && mapRef.current) {
      const f = farms[0];
      const region: Region = {
        latitude: Number(f.lat), longitude: Number(f.lng), latitudeDelta: 0.004, longitudeDelta: 0.004,
      };
      mapRef.current.animateToRegion(region, 900);
      setSelected(f);
    }
  }, [farms]);

  const goTo = (f: Farm) => {
    setSelected(f);
    mapRef.current?.animateCamera(
      { center: { latitude: Number(f.lat), longitude: Number(f.lng) }, zoom: 17 },
      { duration: 800 }
    );
    setShowList(false);
  };

  const fitAll = () => {
    if (!mapRef.current || farms.length === 0) return;
    const coords = farms.map(f => ({ latitude: Number(f.lat), longitude: Number(f.lng) }));
    mapRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 80, bottom: 280, left: 60, right: 60 },
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        liteMode={false}
        initialRegion={{ latitude: -15.9, longitude: -48.6, latitudeDelta: 4.5, longitudeDelta: 4.5 }}
        onPress={() => setSelected(null)}
      >
        {farms.map(f => (
          <Marker
            key={f.id}
            coordinate={{ latitude: Number(f.lat), longitude: Number(f.lng) }}
            title={f.name}
            description={[f.crop && `Cultura: ${f.crop}`, f.owner && `Produtor: ${f.owner}`].filter(Boolean).join(" • ")}
            onPress={() => goTo(f)}
            image={require("./assets/farm-icon.png")}
            anchor={{ x: 0.5, y: 1 }}
            tracksViewChanges={false}
          />
        ))}
      </MapView>

      {/* HUD */}
      <Text style={styles.hud}>
        {BASE_URL} • farms: {farms.length} {isLoading ? "⏳" : isError ? "❌" : "✅"}
      </Text>

      {/* FABs */}
      <View style={styles.fabCol}>
        <TouchableOpacity style={styles.fab} onPress={() => setShowList(s => !s)}>
          <Text style={styles.fabTxt}>{showList ? "Fechar lista" : `Fazendas (${farms.length})`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={fitAll}>
          <Text style={styles.fabTxt}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista compacta */}
      {showList && (
        <View style={styles.sheet}>
          {farms.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSub}>
                  {item.crop ? `Cultura: ${item.crop}` : "—"} {item.area_ha != null ? `• ${item.area_ha} ha` : ""}
                </Text>
              </View>
              <TouchableOpacity style={styles.itemBtn} onPress={() => goTo(item)}>
                <Text style={styles.itemBtnTxt}>Ir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Card selecionado */}
      {selected && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selected.name}</Text>
          {selected.crop ? <Text>Cultura: {selected.crop}</Text> : null}
          {selected.area_ha != null ? <Text>Área: {selected.area_ha} ha</Text> : null}
          {selected.owner ? <Text>Produtor: {selected.owner}</Text> : null}
          <Text style={styles.cardCoords}>
            {Number(selected.lat).toFixed(4)}, {Number(selected.lng).toFixed(4)}
          </Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={() => goTo(selected)}>
              <Text style={styles.btnTxt}>Ir até aqui</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={() => setSelected(null)}>
              <Text style={[styles.btnTxt, { color: "#333" }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  hud: {
    position: "absolute", top: 10, left: 10, backgroundColor: "#fff",
    paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, elevation: 2,
  },
  fabCol: { position: "absolute", right: 12, top: 10, gap: 8, alignItems: "flex-end" },
  fab: { backgroundColor: "#1e90ff", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, elevation: 3 },
  fabTxt: { color: "#fff", fontWeight: "600" },
  sheet: {
    position: "absolute", left: 12, right: 12, bottom: 120, maxHeight: 180,
    backgroundColor: "#fff", borderRadius: 14, padding: 12, elevation: 5,
  },
  itemRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#f7f7f7", padding: 10, borderRadius: 10, marginBottom: 8 },
  itemTitle: { fontWeight: "700" },
  itemSub: { opacity: 0.75, marginTop: 2 },
  itemBtn: { backgroundColor: "#1e90ff", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginLeft: 10 },
  itemBtnTxt: { color: "#fff", fontWeight: "700" },
  card: { position: "absolute", left: 12, right: 12, bottom: 16, padding: 12, backgroundColor: "#fff", borderRadius: 12, elevation: 4 },
  cardTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  cardCoords: { marginTop: 6, fontSize: 12, opacity: 0.7 },
  row: { flexDirection: "row", gap: 8, marginTop: 10 },
  btn: { backgroundColor: "#1e90ff", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  btnGhost: { backgroundColor: "#eee" },
  btnTxt: { color: "#fff", fontWeight: "600" },
});
