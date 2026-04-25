import { projects } from '../data/projects';

export function MobileGrid() {
  return (
    <div className="min-h-screen bg-zinc-950 p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
          >
            <h2 className="text-xl font-semibold text-white mb-2">{project.name}</h2>
            <p className="text-zinc-400 text-sm mb-3">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Live
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-zinc-300"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}