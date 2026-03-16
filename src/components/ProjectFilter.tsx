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

const PAGE_SIZE = 9;

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
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSector = (value: string) => {
    setSector(value);
    setPage(1);
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
          class="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <select
          value={sector}
          onChange={(e) => handleSector((e.target as HTMLSelectElement).value)}
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
        <>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map(project => {
              const isExpanded = expanded.has(project.id);
              const isLong = project.description.length > 120;
              return (
                <div key={project.id} class="border border-slate-200 rounded-lg bg-white overflow-hidden flex flex-col">
                  <div class="p-5 flex flex-col flex-1">
                    <div class="flex items-start justify-between mb-2">
                      <h3 class="text-sm font-semibold text-slate-900">{project.title}</h3>
                      {project.date && <span class="text-xs text-slate-400 shrink-0 ml-2 mt-0.5">{project.date}</span>}
                    </div>
                    <div class="mb-3">
                      <p class={`text-xs text-slate-500 leading-relaxed ${!isExpanded && isLong ? 'line-clamp-3' : ''}`}>
                        {project.description}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => toggleExpand(project.id)}
                          class="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                    <div class="flex flex-wrap gap-1.5 mb-3 mt-auto">
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
              );
            })}
          </div>

          {totalPages > 1 && (
            <div class="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                class="px-3 py-1.5 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  class={`w-8 h-8 text-sm rounded-md transition-colors ${
                    p === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                class="px-3 py-1.5 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          <p class="text-xs text-slate-400 text-center mt-3">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} projects
          </p>
        </>
      )}
    </div>
  );
}
