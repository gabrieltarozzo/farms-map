import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useFarms } from "../hooks/useFarms";
import { Farm } from "../types";
import FarmCard from "../components/FarmCard";
import FarmMarker from "../components/FarmMarker";
import { BASE_URL } from "@/config/env";

export default function FarmsMapScreen() {
  const mapRef = useRef<MapView>(null);
  const { data: farms = [], isLoading, isError } = useFarms();
  const [selected, setSelected] = useState<Farm | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (farms.length && mapRef.current) {
      const f = farms[0];
      const region: Region = {
        latitude: Number(f.lat),
        longitude: Number(f.lng),
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
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
    const pad = showList
      ? { top: 260, bottom: 80, left: 60, right: 60 } // lista no topo
      : { top: 80, bottom: 120, left: 60, right: 60 };
    mapRef.current.fitToCoordinates(coords, { edgePadding: pad, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        liteMode={false}
        initialRegion={{ latitude: -15.9, longitude: -48.6, latitudeDelta: 4.5, longitudeDelta: 4.5 }}
        onPress={() => setSelected(null)}
      >
        {farms.map(f => (
          <FarmMarker key={f.id} farm={f} onPress={goTo} />
        ))}
      </MapView>

      <Text style={styles.hud}>
        {BASE_URL} • farms: {farms.length} {isLoading ? "⏳" : isError ? "❌" : "✅"}
      </Text>

      <View style={styles.fabCol}>
        <TouchableOpacity style={styles.fab} onPress={() => setShowList(s => !s)}>
          <Text style={styles.fabTxt}>{showList ? "Fechar lista" : `Fazendas (${farms.length})`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={fitAll}>
          <Text style={styles.fabTxt}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {showList && (
        <View style={styles.sheetTop}>
           <ScrollView contentContainerStyle={{ paddingBottom: 4 }}>
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
          </ScrollView>
        </View>
      )}

      {selected && <FarmCard farm={selected} onGo={() => goTo(selected)} onClose={() => setSelected(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  hud: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 2,
    zIndex: 5,
    color: "#111",
  },
  fabCol: { position: "absolute", right: 12, top: 10, gap: 8, alignItems: "flex-end", zIndex: 5 },
  fab: { backgroundColor: "#1e90ff", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, elevation: 3 },
  fabTxt: { color: "#fff", fontWeight: "600" },

  sheetTop: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 64, // abaixo do HUD/FAB
    maxHeight: 220,
    backgroundColor: "#ffffffee",
    borderRadius: 14,
    padding: 12,
    elevation: 5,
    zIndex: 4,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemTitle: { fontWeight: "700", color: "#111" },
  itemSub: { color: "#556", opacity: 0.75, marginTop: 2 },
  itemBtn: { backgroundColor: "#1e90ff", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginLeft: 10 },
  itemBtnTxt: { color: "#fff", fontWeight: "700" },
});
