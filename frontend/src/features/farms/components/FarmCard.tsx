import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Farm } from "../types";

type Props = { farm: Farm; onGo: () => void; onClose: () => void };
export default function FarmCard({ farm, onGo, onClose }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{farm.name}</Text>
      {farm.crop ? <Text>Cultura: {farm.crop}</Text> : null}
      {farm.area_ha != null ? <Text>Área: {farm.area_ha} ha</Text> : null}
      {farm.owner ? <Text>Produtor: {farm.owner}</Text> : null}
      <Text style={styles.coords}>{Number(farm.lat).toFixed(4)}, {Number(farm.lng).toFixed(4)}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={onGo}><Text style={styles.btnTxt}>Ir até aqui</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={onClose}><Text style={[styles.btnTxt, { color: "#333" }]}>Fechar</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { position: "absolute", left: 12, right: 12, bottom: 16, padding: 12, backgroundColor: "#fff", borderRadius: 12, elevation: 4 },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  coords: { marginTop: 6, fontSize: 12, opacity: 0.7 },
  row: { flexDirection: "row", gap: 8, marginTop: 10 },
  btn: { backgroundColor: "#1e90ff", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  btnGhost: { backgroundColor: "#eee" },
  btnTxt: { color: "#fff", fontWeight: "600" },
});
