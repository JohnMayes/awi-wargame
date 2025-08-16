import { AxialCoordinates, OffsetCoordinates } from "honeycomb-grid";
import { TerrainType } from "@/types/hex";
import { Unit } from "@/types/unit";

export interface MapCell {
  col: number;
  row: number;
  terrain: TerrainType;
  occupant?: Unit['id'];
}

export const TEST_MAP: MapCell[] = [
  { col: 0, row: 0, terrain: TerrainType.OPEN },
  { col: 0, row: 1, terrain: TerrainType.OPEN },
  { col: 0, row: 2, terrain: TerrainType.OPEN },
  { col: 0, row: 3, terrain: TerrainType.OPEN },
  { col: 1, row: 0, terrain: TerrainType.OPEN },
  { col: 1, row: 1, terrain: TerrainType.OPEN },
  { col: 1, row: 2, terrain: TerrainType.OPEN },
  { col: 1, row: 3, terrain: TerrainType.OPEN },
  { col: 2, row: 0, terrain: TerrainType.OPEN },
  { col: 2, row: 1, terrain: TerrainType.OPEN },
  { col: 2, row: 2, terrain: TerrainType.OPEN },
  { col: 2, row: 3, terrain: TerrainType.OPEN },
  { col: 3, row: 0, terrain: TerrainType.OPEN },
  { col: 3, row: 1, terrain: TerrainType.OPEN },
  { col: 3, row: 2, terrain: TerrainType.OPEN },
  { col: 3, row: 3, terrain: TerrainType.OPEN },
  { col: 4, row: 0, terrain: TerrainType.OPEN },
  { col: 4, row: 1, terrain: TerrainType.OPEN },
  { col: 4, row: 2, terrain: TerrainType.OPEN },
  { col: 4, row: 3, terrain: TerrainType.OPEN },
  { col: 5, row: 0, terrain: TerrainType.OPEN },
  { col: 5, row: 1, terrain: TerrainType.OPEN },
  { col: 5, row: 2, terrain: TerrainType.OPEN },
  { col: 5, row: 3, terrain: TerrainType.OPEN },
];