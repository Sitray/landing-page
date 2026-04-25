import { useState, useEffect } from 'react';

export function useWebGL(): boolean {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        setHasWebGL(!!gl);
      } catch {
        setHasWebGL(false);
      }
    };

    checkWebGL();
  }, []);

  return hasWebGL;
}