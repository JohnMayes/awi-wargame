import { OffsetCoordinates, defineHex, Orientation } from "honeycomb-grid";
import { Unit } from "./unit";

export enum TerrainType {
  OPEN = 'open',
  WOODS = 'woods',
  TOWNS = 'towns',
  MARSH = 'marsh',
  LAKE = 'lake',
  RIVER = 'river',
  ROAD = 'road'
};

export type RelativePosition = 'front' | 'flank' | 'rear';

export interface HexProperties {
  terrain: TerrainType,
  occupant?: Unit['id'];
};

export class HexCell extends defineHex({ dimensions: 100, origin: 'topLeft', orientation: Orientation.FLAT }) {
  terrain!: TerrainType;
  occupant?: Unit['id'];

  static create(config: OffsetCoordinates & HexProperties) {
    const cell = new HexCell(config);
    cell.terrain = config.terrain;
    cell.occupant = config.occupant;
    return cell;
  }
};