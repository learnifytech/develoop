import { useRef } from 'react';
import { useFluidCanvas } from '../hooks/useFluidCanvas';

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFluidCanvas(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      id="fluid-canvas"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
