'use client';
import CanvasWrapper from "@/components/CanvasWrapper";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Home() {
  const { width, height } = useWindowSize();
  return (
    <CanvasWrapper width={width} height={height} />
  );
}
