import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from "react-native";
import { Farm } from "../types";

type Props = { farms: Farm[]; onGo: (f: Farm) => void; onClose: () => void };

export default function FarmList({ farms, onGo, onClose }: Props) {
  return (
    <View style={styles.sheet}>
      <FlatList
        data={farms}
        keyExtractor={f => String(f.id)}
        showsVerticalScrollIndicator
        contentContainerStyle={{ paddingBottom: 8 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.sub} numberOfLines={1}>
                {item.crop ? `Cultura: ${item.crop}` : "—"} {item.area_ha != null ? `• ${item.area_ha} ha` : ""}
              </Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => onGo(item)}>
              <Text style={styles.btnTxt}>Ir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity onPress={onClose} style={[styles.btn, { marginTop: 10, alignSelf: "flex-end" }]}>
        <Text style={styles.btnTxt}>Fechar lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 12, right: 12, bottom: 120,
    maxHeight: 320,
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 16,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#00000022",
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 8 },
      ios: { shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }
    }),
    zIndex: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#0000001a",
    ...Platform.select({ android: { elevation: 1 } }),
  },
  title: { color: "#111", fontWeight: "800" },
  sub: { color: "#555", marginTop: 2 },
  btn: { backgroundColor: "#1976d2", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, marginLeft: 8 },
  btnTxt: { color: "#fff", fontWeight: "800" },
});
