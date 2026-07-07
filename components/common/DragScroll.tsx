"use client";
import { useRef, ReactNode, PointerEvent } from "react";

type DragScrollProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Horizontally scrollable row with a thin scrollbar and click-and-drag
 * scrolling (mouse only). Touch devices keep their native momentum scroll.
 */
function DragScroll({ children, className = "" }: DragScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.releasePointerCapture?.(e.pointerId);
    el.style.cursor = "grab";
    el.style.userSelect = "";
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`thin-scrollbar overflow-x-auto cursor-grab ${className}`}
    >
      {children}
    </div>
  );
}

export default DragScroll;
