import type { Project } from "../data/projects";

interface ProjectPanelProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectPanel({ project, isOpen, onClose }: ProjectPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900/95 backdrop-blur-sm border-l border-zinc-800 p-6 transform transition-transform duration-300 ease-out"
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}
      role="dialog"
      aria-labelledby="project-title"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl"
        aria-label="Close panel"
      >
        ×
      </button>

      <h2
        id="project-title"
        className="text-2xl font-bold text-white mb-2"
        style={{ color: project.color }}
      >
        {project.name}
      </h2>

      <p className="text-zinc-400 text-sm mb-4">{project.shortDescription}</p>

      <p className="text-zinc-300 mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full bg-zinc-800 text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
          >
            Live Demo
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
