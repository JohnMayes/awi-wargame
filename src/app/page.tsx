'use client';
import CanvasWrapper from "@/components/CanvasWrapper";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ControlMenu } from "@/components";

export default function Home() {
  const { width, height } = useWindowSize();
  return (
    <div style={{width, height}} className="bg-zinc-100 relative flex items-center justify-center">
      <CanvasWrapper width={width-10} height={height-10} />
      <div className="absolute bottom-4 top-4 right-4 w-64 bg-white/25 rounded-xl p-4">
        <ControlMenu />
      </div>
    </div>
  );
}
