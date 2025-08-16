'use client';
import { FunctionComponent, useEffect, useRef } from "react";
import { Stage, Layer, RegularPolygon } from "react-konva";
import { useGameStore } from "@/store/gameStore";
import { HexCoordinates } from "honeycomb-grid";
import { TEST_MAP } from "@/constants/maps";

interface GameCanvasProps {
  width: number;
  height: number;
}

const GameCanvas: FunctionComponent<GameCanvasProps> = ({ width, height }) => {
  const grid = useGameStore(state => state.grid);
  const createGrid = useGameStore(state => state.createGrid);
  const stageRef = useRef<any>(null);

  useEffect(() => {
    createGrid(TEST_MAP);
  }, []);


  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) {
      return;
    };
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? -1 : 1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const scaleBy = 1.5;
    const newScale = direction > 0 ? Math.min(oldScale * scaleBy, 1) : Math.max(oldScale / scaleBy, 0.3);

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  };

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      draggable
      onWheel={handleWheel}
    >
      <Layer>
        {grid?.toArray().map((hex) => {
          const coordinates: HexCoordinates = { q: hex.q, r: hex.r };
          return (
            <RegularPolygon
              key={`${coordinates.q}-${coordinates.r}`}
              sides={6}
              width={hex.width}
              height={hex.height}
              x={hex.x}
              y={hex.y}
              radius={hex.dimensions.xRadius}
              stroke="lightgray"
              strokeWidth={1}
              rotation={30}
            />
          )
        })}
      </Layer>
    </Stage>
  );
}

export default GameCanvas;