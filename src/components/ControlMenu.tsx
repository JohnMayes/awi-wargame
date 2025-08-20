'use client';
import { FunctionComponent, useMemo } from "react";
import { useGameStore } from "@/store/gameStore";
import { useShallow } from "zustand/shallow";

interface ControlMenuProps {

}

export const ControlMenu: FunctionComponent<ControlMenuProps> = () => {
  const { turn, activePlayer, phase, selectedOrder, selectedUnit, units } = useGameStore(
    useShallow((state) => ({
      turn: state.turn,
      activePlayer: state.activePlayer,
      phase: state.phase,
      selectedOrder: state.selectedOrder,
      selectedUnit: state.selectedUnit,
      units: state.units
    }))
  );

  const currentlySelectedUnit = useMemo(() => {
    return units.find(unit => unit.id === selectedUnit)
  }, [units, selectedUnit])

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex w-full gap-2 justify-between">
        <span>Turn: {turn}</span>
        <span className="capitalize">Player: {activePlayer}</span>
      </div>
      <span className="capitalize">Phase: {phase}</span>

      <div>
        Selected Unit:
        <div className="grid grid-cols-2 border rounded w-full h-48">
          {currentlySelectedUnit && (
            <>
              <span className="capitalize">{currentlySelectedUnit.unitType}</span>
              <span>ST: {currentlySelectedUnit.strength}</span>
              <span>MV: {currentlySelectedUnit.movement}</span>
              <span>RN: {currentlySelectedUnit.range}</span>
            </>
          )}
        </div>
      </div>

      <div>
        Orders:
        <div className="flex gap-2 justify-between">
          <button>Move</button>
          <button>Fire</button>
        </div>
      </div>

      <div className="w-full border rounded grow flex-1 h-full">Messages</div>

      <div className="w-full h-24 border rounded">Scenario</div>
      
      <div className="h-16">Settings</div>
    </div>
  );
};