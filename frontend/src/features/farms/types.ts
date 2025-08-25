export type Farm = {
  id: number;
  name: string;
  crop?: string | null;
  area_ha?: number | null;
  lat: number | string;
  lng: number | string;
  owner?: string | null;
};
