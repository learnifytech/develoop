import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  const { dotRef, ringRef } = useCursor();

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
