'use client';
import { FunctionComponent } from "react";
import { RegularPolygon } from "react-konva";
import { HexCell } from "@/types/hex";
import { useGameStore } from "@/store/gameStore";

interface RenderHexProps {
  hex: HexCell;
}

export const RenderHex: FunctionComponent<RenderHexProps> = ({ hex }) => {
  const selectedUnit = useGameStore(state => state.selectedUnit)
  const deselectUnit = useGameStore(state => state.deselectUnit);
  const moveUnit = useGameStore(state => state.moveUnit);
  const phase = useGameStore(state => state.phase);
  const selectedOrder = useGameStore(state => state.selectedOrder);

  // need an 'isMoving' flag
  const handleClick = () => {
    if (selectedUnit && phase === 'orders' && selectedOrder === 'move') {
      moveUnit({col: hex.col, row: hex.row})
    } else deselectUnit();
  }

  return (
    <RegularPolygon
      sides={6}
      width={hex.width}
      height={hex.height}
      x={hex.x}
      y={hex.y}
      radius={hex.dimensions.xRadius}
      stroke="lightgray"
      strokeWidth={1}
      rotation={30}
      onClick={handleClick}
    />
  );
};