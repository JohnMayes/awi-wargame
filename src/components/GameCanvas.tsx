'use client';
import { FunctionComponent, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useGameStore } from "@/store/gameStore";
import { HexCoordinates } from "honeycomb-grid";
import { TEST_MAP } from "@/constants/maps";
import { RenderHex } from "./RenderHex";
import { RenderUnit } from "./RenderUnit";
import { Unit, infantryUnit } from "@/types/unit";

interface GameCanvasProps {
  width: number;
  height: number;
}

const GameCanvas: FunctionComponent<GameCanvasProps> = ({ width, height }) => {
  const grid = useGameStore(state => state.grid);
  const createGrid = useGameStore(state => state.createGrid);
  const units = useGameStore(state => state.units);
  const addUnit = useGameStore(state => state.addUnit);
  const stageRef = useRef<any>(null);

  useEffect(() => {
    createGrid(TEST_MAP);
    addUnit(infantryUnit, {id: 'red-iu1', side: 'blue', position: {col: 0, row: 1}})
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

  // const dragBoundFunc = (pos: any) => {
  //   // Example: Constrain the stage to a specific rectangular area
  //   const minX = -200; // Minimum x-coordinate
  //   const maxX = 200;  // Maximum x-coordinate
  //   const minY = -100; // Minimum y-coordinate
  //   const maxY = 100;  // Maximum y-coordinate

  //   let newX = pos.x;
  //   let newY = pos.y;

  //   if (newX < minX) {
  //     newX = minX;
  //   } else if (newX > maxX) {
  //     newX = maxX;
  //   }

  //   if (newY < minY) {
  //     newY = minY;
  //   } else if (newY > maxY) {
  //     newY = maxY;
  //   }

  //   return { x: newX, y: newY };
  // };

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      draggable
      // dragBoundFunc={dragBoundFunc}
      onWheel={handleWheel}
      className="bg-zinc-900 rounded-2xl"
    >
      <Layer>
        {grid?.toArray().map((hex) => {
          const coordinates: HexCoordinates = { q: hex.q, r: hex.r };
          return (
            <RenderHex key={`${coordinates.q}-${coordinates.r}`} hex={hex} />
          )
        })}
      </Layer>
      <Layer>
        {units.map(unit => {
          return <RenderUnit key={unit.id} unit={unit} />
        })}
      </Layer>
    </Stage>
  );
}

export default GameCanvas;