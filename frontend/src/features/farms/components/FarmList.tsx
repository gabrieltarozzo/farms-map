import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Farm } from "../types";

type Props = { farms: Farm[]; onGo: (f: Farm) => void; onClose: () => void };
export default function FarmList({ farms, onGo, onClose }: Props) {
  return (
    <View style={styles.sheet}>
      <FlatList
        data={farms}
        keyExtractor={f => String(f.id)}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.sub}>{item.crop ? `Cultura: ${item.crop}` : "—"} {item.area_ha != null ? `• ${item.area_ha} ha` : ""}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => onGo(item)}><Text style={styles.btnTxt}>Ir</Text></TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={onClose} style={[styles.btn, { marginTop: 10 }]}><Text style={styles.btnTxt}>Fechar lista</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  sheet: { position: "absolute", left: 12, right: 12, bottom: 120, maxHeight: 180, backgroundColor: "#fff", borderRadius: 14, padding: 12, elevation: 5 },
  row: { flexDirection: "row", alignItems: "center", backgroundColor: "#f7f7f7", padding: 10, borderRadius: 10 },
  title: { fontWeight: "700" }, sub: { opacity: 0.75, marginTop: 2 },
  btn: { backgroundColor: "#1e90ff", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginLeft: 10 },
  btnTxt: { color: "#fff", fontWeight: "700" },
});
