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
};

interface GameState {
  activePlayer: 'red' | 'blue';
  turn: number;
  phase: 'orders' | 'hand-to-hand' | 'check-victory';
  selectedOrder: 'move' | 'fire' | undefined;
  changePlayer: () => void;
  changePhase: () => void;
  advanceTurn: () => void;
};

const createGameSlice: StateCreator<GameState & UnitState, [], [], GameState> = ((set, get) => ({
  activePlayer: 'red',
  turn: 1,
  phase: 'orders',
  selectedOrder: undefined,
  changePlayer: () => {
    const currentPlayer = get().activePlayer;
    if (currentPlayer === 'red') {
      set({activePlayer: 'blue'})
    } else set({activePlayer: 'red'})
  },
  changePhase: () => {
    const currentPhase = get().phase;
    switch (currentPhase) {
      case 'orders':
        set({phase: 'hand-to-hand'});
        break;
      case 'hand-to-hand': 
        set({phase: 'check-victory'});
        break;
      default:
        set({phase: 'orders'})
    };
  },
  advanceTurn: () => {
    set((state) => ({turn: state.turn + 1}))
    set((state) => ({units: state.units.map((unit) => ({...unit, hasActedThisTurn: false}))}))
  }
})); 

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

const createUnitSlice: StateCreator<UnitState & GridState & GameState, [], [], UnitState> = ((set, get) => ({
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
    const currentPhase = get().phase;
    const selectedOrder = get().selectedOrder;
    if (selectedUnit && currentPhase === 'orders' && selectedOrder === 'move') {
      set((state) => {
        return {units: state.units.map((unit) => {
          if (unit.id === selectedUnit && !unit.hasActedThisTurn) {
            return {...unit, position: coordinates, hasActedThisTurn: true}
          } else return unit
        })}
      })
    }
  }
}))

export const useGameStore = create<GridState & UnitState & GameState>()((...a) => ({
  ...createGridSlice(...a),
  ...createUnitSlice(...a),
  ...createGameSlice(...a)
}));
