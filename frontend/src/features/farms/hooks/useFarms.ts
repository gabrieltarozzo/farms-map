import { useQuery } from "@tanstack/react-query";
import { listFarms } from "../api/farms.api";
import { Farm } from "../types";

export function useFarms() {
  const q = useQuery<Farm[]>({ queryKey: ["farms"], queryFn: listFarms });
  return q; // { data, isLoading, isError, ... }
}
