import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Farm } from "../types";

type Props = { farm: Farm; onGo: () => void; onClose: () => void };

export default function FarmCard({ farm, onGo, onClose }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{farm.name}</Text>
      {farm.crop ? <Text style={styles.line}>Cultura: <Text style={styles.lineStrong}>{farm.crop}</Text></Text> : null}
      {farm.area_ha != null ? <Text style={styles.line}>Área: <Text style={styles.lineStrong}>{farm.area_ha} ha</Text></Text> : null}
      {farm.owner ? <Text style={styles.line}>Produtor: <Text style={styles.lineStrong}>{farm.owner}</Text></Text> : null}
      <Text style={styles.coords}>{Number(farm.lat).toFixed(4)}, {Number(farm.lng).toFixed(4)}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={onGo}>
          <Text style={styles.btnTxt}>Ir até aqui</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={onClose}>
          <Text style={[styles.btnTxt, { color: "#333" }]}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 12, right: 12, bottom: 16,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#00000022",
    ...Platform.select({
      android: { elevation: 6 },
      ios: { shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }
    }),
    zIndex: 20,
  },
  title: { color: "#111", fontWeight: "800", fontSize: 16, marginBottom: 6 },
  line: { color: "#333", marginTop: 2 },
  lineStrong: { fontWeight: "600" },
  coords: { marginTop: 8, fontSize: 12, color: "#555" },
  row: { flexDirection: "row", gap: 10, marginTop: 12 },
  btn: { backgroundColor: "#1976d2", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  btnGhost: { backgroundColor: "#eee" },
  btnTxt: { color: "#fff", fontWeight: "700" },
});
