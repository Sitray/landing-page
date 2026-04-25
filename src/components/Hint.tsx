export function Hint() {
  return (
    <div className="fixed top-4 left-4 text-zinc-500 text-xs z-10 text-left">
      <div className="mb-1">
        Press <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-400">ESC</kbd> to reset view
      </div>
      <div>
        Use <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-400">WASD</kbd> to move
      </div>
    </div>
  );
}
