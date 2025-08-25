// src/features/farms/components/FarmMarker.tsx
import React from "react";
import { Marker } from "react-native-maps";
import { Farm } from "../types";

// Assumindo que o ícone está em: src/assets/farm-icon.png
const farmIcon = require("../../../assets/farm-icon.png");

type Props = { farm: Farm; onPress: (f: Farm) => void };
export default function FarmMarker({ farm, onPress }: Props) {
  return (
    <Marker
      coordinate={{ latitude: Number(farm.lat), longitude: Number(farm.lng) }}
      title={farm.name}
      description={[farm.crop && `Cultura: ${farm.crop}`, farm.owner && `Produtor: ${farm.owner}`]
        .filter(Boolean).join(" • ")}
      onPress={() => onPress(farm)}
      image={farmIcon}
      anchor={{ x: 0.5, y: 1 }}
      tracksViewChanges={false}
    />
  );
}
