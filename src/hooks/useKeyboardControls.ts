import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

export function useKeyboardControls(
  controlsRef: React.RefObject<CameraControls | null>,
) {
  const keys = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.key.toLowerCase());
    };

    let animationId: number;

    const move = () => {
      const controls = controlsRef.current;
      if (!controls) {
        animationId = requestAnimationFrame(move);
        return;
      }

      const speed = 2.5; // Adjust movement speed here
      const w = keys.current.has("w");
      const a = keys.current.has("a");
      const s = keys.current.has("s");
      const d = keys.current.has("d");

      if (w || a || s || d) {
        const camera = controls.camera;
        const distance = camera.position.length() || 15;
        const x = (d ? 1 : 0) - (a ? 1 : 0);
        const z = (s ? 1 : 0) - (w ? 1 : 0);

        const pos = camera.position;
        controls.setLookAt(
          pos.x + x * speed * (distance / 10),
          pos.y,
          pos.z + z * speed * (distance / 10),
          pos.x + x * (distance / 10),
          pos.y,
          pos.z - 10,
          true,
        );
      }

      animationId = requestAnimationFrame(move);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    move();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [controlsRef]);
}
