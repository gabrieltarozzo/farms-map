import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/query";
import FarmsMapScreen from "@/features/farms/screens/FarmsMapScreen";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FarmsMapScreen />
    </QueryClientProvider>
  );
}