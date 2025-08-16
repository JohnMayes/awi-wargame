'use client'
import dynamic from 'next/dynamic';

const GameCanvas = dynamic(() => import('./GameCanvas'), {
  ssr: false,
});

interface CanvasProps {
  width: number,
  height: number,
  // backgroundColor: string
}

const CanvasWrapper = (props: CanvasProps) => <GameCanvas width={props.width} height={props.height} />

export default CanvasWrapper;