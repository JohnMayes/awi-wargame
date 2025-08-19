'use client'
import { FunctionComponent } from "react";
import { Rect } from "react-konva";
import { Unit } from "@/types/unit";
import { useGameStore } from "@/store/gameStore";

interface RenderUnitProps {
  unit: Unit
}

export const RenderUnit: FunctionComponent<RenderUnitProps> = ({ unit }) => {
  const cell = useGameStore(state => state.getCellAt(unit.position));
  const selectedUnit = useGameStore(state => state.selectedUnit);
  const selectUnit = useGameStore(state => state.selectUnit)
  if (cell) {
    return (
      <Rect
        x={cell.x - 58}
        y={cell.y - 25}
        width={120}
        height={50}
        fill={unit.side}
        stroke={selectedUnit === unit.id ? 'gold' : 'transparent'}
        strokeWidth={2}
        onClick={() => selectUnit(unit.id)}
        opacity={unit.hasActedThisTurn ? 0.2 : 1}
      />
    );
  } else return null;
};