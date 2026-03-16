import { useState, useMemo } from 'preact/hooks';

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  sector: string;
  tech: string[];
  image?: string;
  links?: ProjectLink[];
  date?: string;
}

interface Props {
  projects: Project[];
}

const sectorLabels: Record<string, string> = {
  all: 'All Projects',
  nlp: 'NLP & LLMs',
  healthcare: 'Healthcare',
  cv: 'Computer Vision',
  ml: 'Machine Learning',
  energy: 'Renewable Energy',
  transport: 'Transportation',
  'data-analysis': 'Data Analysis',
  'image-processing': 'Image Processing',
};

export default function ProjectFilter({ projects }: Props) {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('all');

  const sectors = useMemo(() => {
    const unique = [...new Set(projects.map(p => p.sector))];
    return ['all', ...unique];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesSector = sector === 'all' || p.sector === sector;
      const matchesSearch = search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesSector && matchesSearch;
    });
  }, [projects, search, sector]);

  return (
    <div>
      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          class="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <select
          value={sector}
          onChange={(e) => setSector((e.target as HTMLSelectElement).value)}
          class="px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          {sectors.map(s => (
            <option key={s} value={s}>{sectorLabels[s] || s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p class="text-sm text-slate-500 text-center py-12">No projects found matching your criteria.</p>
      ) : (
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <div key={project.id} class="border border-slate-200 rounded-lg bg-white overflow-hidden">
              {project.image && (
                <img src={project.image} alt={project.title} class="w-full h-40 object-cover" loading="lazy" />
              )}
              <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-semibold text-slate-900 line-clamp-1">{project.title}</h3>
                  {project.date && <span class="text-xs text-slate-400 shrink-0 ml-2">{project.date}</span>}
                </div>
                <p class="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div class="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.slice(0, 4).map(tag => (
                    <span key={tag} class="px-2 py-1 text-xs text-blue-700 bg-blue-50 rounded">{tag}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span class="px-2 py-1 text-xs text-slate-500 bg-slate-50 rounded">+{project.tech.length - 4}</span>
                  )}
                </div>
                {project.links && project.links.length > 0 && (
                  <div class="flex gap-3">
                    {project.links.map(link => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener"
                         class="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
