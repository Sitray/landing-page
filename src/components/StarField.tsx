import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  radius?: number;
  depth?: number;
}

export function StarField({ count = 2000, radius = 100, depth = 50 }: StarFieldProps) {
  const starsRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Create varied size distribution
  const sizeDistribution = useMemo(() => {
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sizes[i] = 0.5 + Math.random(); // 0.5 to 1.5
    }
    return sizes;
  }, [count]);

  // Parallax effect
  useFrame((state) => {
    if (!starsRef.current || prefersReducedMotion) return;

    const mouse = state.pointer;
    const x = (mouse.x * viewport.width) / 50;
    const y = (mouse.y * viewport.height) / 50;

    // Smooth parallax with lerp
    starsRef.current.position.x += (x - starsRef.current.position.x) * 0.02;
    starsRef.current.position.y += (y - starsRef.current.position.y) * 0.02;
  });

  return (
    <Stars
      ref={starsRef}
      count={count}
      radius={radius}
      depth={depth}
      factor={4}
      saturation={0}
      fade
      speed={prefersReducedMotion ? 0 : 0.5}
    />
  );
}