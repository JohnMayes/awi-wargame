import { create, StateCreator } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Grid, OffsetCoordinates } from 'honeycomb-grid';
import { HexCell } from '@/types/hex';
import { Unit, createUnit } from '@/types/unit';
import { MapCell } from '@/constants/maps';

interface GridState {
  grid: Grid<HexCell> | undefined;
  createGrid: (cells: MapCell[]) => void;
  destroyGrid: () => void;
  getCellAt: (coordinates: OffsetCoordinates) => HexCell | undefined;
  getUnitPositions: () => Grid<HexCell> | undefined;
};

interface UnitState {
  units: Unit[];
  selectedUnit: Unit['id'] | undefined;
  addUnit: (template: Partial<Unit>, overrides: Partial<Unit>) => void;
  selectUnit: (unitId: Unit['id']) => void;
  deselectUnit: () => void;
  moveUnit: (coordinates: OffsetCoordinates) => void;
}

const createGridSlice: StateCreator<GridState> = ((set, get) => ({
  grid: undefined,
  createGrid: (cells: MapCell[]) => {
    const grid = new Grid(HexCell, cells.map(HexCell.create));
    set(() => ({ grid }))
  },
  destroyGrid: () => set({grid: undefined}),
  getUnitPositions: () => {
    const units = get().grid?.filter(hex => hex.occupant != undefined);
    return units;
  },
  getCellAt: (coordinates: OffsetCoordinates) => get().grid?.getHex(coordinates)
}));

const createUnitSlice: StateCreator<UnitState & GridState, [], [], UnitState> = ((set, get) => ({
  units: [],
  selectedUnit: undefined,
  selectUnit: (unitId: Unit['id']) => set(() => ({selectedUnit: unitId})),
  deselectUnit: () => set(({selectedUnit: undefined})),
  addUnit: (template: Partial<Unit>, overrides: Partial<Unit>) => {
    const newUnit = createUnit(template, overrides);
    set((state) => ({units: [...state.units, newUnit]}));
    set((state) => ({grid: state.grid?.map((hex) => {
      if (hex.col === newUnit.position.col && hex.row === newUnit.position.row) {
        hex.occupant = newUnit.id;
      };
      return hex;
    })}))
  },
  moveUnit: (coordinates: OffsetCoordinates) => {
    const selectedUnit = get().selectedUnit;
    if (selectedUnit) {
      set((state) => {
        return {units: state.units.map((unit) => {
          if (unit.id === selectedUnit) {
            return {...unit, position: coordinates}
          } else return unit
        })}
      })
    }
  }
}))

export const useGameStore = create<GridState & UnitState>()((...a) => ({
  ...createGridSlice(...a),
  ...createUnitSlice(...a)
}));
