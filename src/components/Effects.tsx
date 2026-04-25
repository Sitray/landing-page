import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function useFrameBudget(threshold = 30): boolean {
  const [withinBudget, setWithinBudget] = useState(true);
  const frameTimes = useRef<number[]>([]);
  const frameRef = useRef(0);

  useFrame((state) => {
    const currentTime = state.clock.getElapsedTime();
    const delta = state.clock.getDelta();
    
    frameTimes.current.push(delta);
    frameRef.current++;

    // Check average every 60 frames
    if (frameRef.current >= 60) {
      const avgFrameTime = frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
      const fps = 1 / avgFrameTime;
      setWithinBudget(fps >= threshold);
      frameTimes.current = [];
      frameRef.current = 0;
    }
  });

  return withinBudget;
}

interface EffectsProps {
  enabled?: boolean;
}

export function Effects({ enabled = true }: EffectsProps) {
  const withinBudget = useFrameBudget(30);

  if (!enabled || !withinBudget) return null;

  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
      />
    </EffectComposer>
  );
}