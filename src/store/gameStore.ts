import { create, StateCreator } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Grid } from 'honeycomb-grid';
import { HexCell } from '@/types/hex';
import { MapCell } from '@/constants/maps';

interface GridState {
  grid: Grid<HexCell> | undefined;
  createGrid: (cells: MapCell[]) => void;
  destroyGrid: () => void;
};

const createGridSlice: StateCreator<GridState> = ((set) => ({
  grid: undefined,
  createGrid: (cells: MapCell[]) => {
    const grid = new Grid(HexCell, cells.map(HexCell.create));
    set(() => ({ grid }))
  },
  destroyGrid: () => set({grid: undefined})
}));

export const useGameStore = create<GridState>()((...a) => ({
  ...createGridSlice(...a)
}));
