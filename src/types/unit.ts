
import { Direction, OffsetCoordinates } from "honeycomb-grid"
import { TerrainType } from "./hex"

export enum UnitType {
  INFANTRY = 'infantry',
  SKIRMISHERS = 'skirmishers',
  CAVALRY = 'cavalry',
  ARTILLERY = 'artillery',
  LEADER = 'leader'
};

export type PlayerSide = 'blue' | 'red';

export interface Unit {
  id: string;
  side: PlayerSide;
  unitType: UnitType;
  movement: number;
  range: number;
  strength: number;
  movementRestrictions: TerrainType[];
  moraleBonus: boolean;
  position: OffsetCoordinates;
  facing: Direction;
  hasActedThisTurn: boolean;
};

export const infantryUnit: Partial<Unit> = {
  unitType: UnitType.INFANTRY,
  movement: 1,
  range: 2,
  movementRestrictions: [TerrainType.LAKE],
};

export const skirmisherUnit: Partial<Unit> = {
  unitType: UnitType.SKIRMISHERS,
  movement: 1,
  range: 2,
  movementRestrictions: [TerrainType.LAKE],
  moraleBonus: true
};

export const cavalryUnit: Partial<Unit> = {
  unitType: UnitType.CAVALRY,
  movement: 2,
  range: 2,
  movementRestrictions: [TerrainType.LAKE, TerrainType.MARSH, TerrainType.WOODS],
};

export const artilleryUnit: Partial<Unit> = {
  unitType: UnitType.ARTILLERY,
  movement: 1,
  movementRestrictions: [TerrainType.LAKE, TerrainType.MARSH, TerrainType.WOODS],
  range: 8,
};

export const leaderUnit: Partial<Unit> = {
  unitType: UnitType.LEADER,
  movement: 1,
  movementRestrictions: [TerrainType.LAKE, TerrainType.MARSH, TerrainType.WOODS],
  range: 8,
};

export const createUnit = (template: Partial<Unit>, overrides: Partial<Unit>): Unit => {
  if (!template.unitType && !overrides.unitType) {
    throw new Error ('Unit type is required')
  }

  return {
    id: crypto.randomUUID(),
    movement: 1,
    range: 1,
    strength: 1,
    moraleBonus: false,
    facing: Direction.E,
    movementRestrictions: [],
    ...template,
    ...overrides
  } as Unit
}