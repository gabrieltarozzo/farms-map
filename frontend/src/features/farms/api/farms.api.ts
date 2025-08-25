import axios from "axios";
import { BASE_URL } from "@/config/env";
import { Farm } from "../types";

export const api = axios.create({ baseURL: BASE_URL, timeout: 8000 });

export const isValidCoord = (x: number) => Number.isFinite(x) && Math.abs(x) <= 180;

export async function listFarms(): Promise<Farm[]> {
  const r = await api.get<Farm[]>("/farms");
  return (r.data || []).filter(f => isValidCoord(Number(f.lat)) && isValidCoord(Number(f.lng)));
}
