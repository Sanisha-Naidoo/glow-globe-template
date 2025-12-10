import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useProjectScaleAnimation } from '../hooks/useProjectScaleAnimation';
import { ExternalLink, X, Link2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import trusteeLogo from '../assets/logos/trustee.png';
import prelovedLogo from '../assets/logos/preloved.png';

interface Project {
  name: string;
  tagline: string;
  url: string;
  connectedUrl?: string;
  connectedName?: string;
  logo: string;
  tools: string[];
  motivation: string;
  description: string;
}

const PastProjectsSection = () => {
  const sectionRef = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      name: 'Trustee',
      tagline: 'Trust management platform',
      url: 'https://trustee.lovable.app/',
      logo: trusteeLogo,
      tools: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
      motivation: 'Simplifying trust and estate management for families and beneficiaries.',
      description: 'A comprehensive platform for managing trusts, enabling transparent communication between trustees and beneficiaries while ensuring compliance and security.'
    },
    {
      name: 'PreLoved Shoes',
      tagline: 'Circular economy for footwear',
      url: 'https://preloved-shoes.lovable.app/',
      connectedUrl: 'https://shoe-store.lovable.app/',
      connectedName: 'Shoe Store',
      logo: prelovedLogo,
      tools: ['React', 'TypeScript', 'Supabase', 'PWA', 'Tailwind'],
      motivation: 'Closing gaps in the circular economy by tracking donated shoes from collection to distribution.',
      description: 'A non-profit PWA that supports tracking of donated shoes, connecting givers with receivers. The future state aims to collect data to support manufacturers in sustainable practices.'
    }
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-24 relative bg-dark-bg opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-pink-accent uppercase mb-4">Portfolio</p>
          <h2 className="text-4xl lg:text-5xl text-text-light font-bold tracking-tight mb-6">
            Past Projects
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-pink-accent to-transparent" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-dark-bg border-foreground/10">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-foreground/5 p-2">
                    <img src={selectedProject.logo} alt={selectedProject.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-text-light">{selectedProject.name}</DialogTitle>
                    <p className="text-text-light/60">{selectedProject.tagline}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-text-light/70 leading-relaxed">{selectedProject.description}</p>
                
                <div>
                  <h4 className="text-xs tracking-[0.2em] text-pink-accent uppercase mb-3">Motivation</h4>
                  <p className="text-text-light/70 leading-relaxed">{selectedProject.motivation}</p>
                </div>

                <div>
                  <h4 className="text-xs tracking-[0.2em] text-pink-accent uppercase mb-3">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 text-xs tracking-wider uppercase bg-foreground/5 text-text-light/80 rounded-full border border-foreground/10">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-accent text-dark-bg rounded-lg font-medium text-sm hover:bg-pink-accent/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit {selectedProject.name}
                  </a>
                  {selectedProject.connectedUrl && (
                    <a
                      href={selectedProject.connectedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/10 text-text-light rounded-lg font-medium text-sm hover:bg-foreground/20 transition-colors"
                    >
                      <Link2 className="w-4 h-4" />
                      Connected: {selectedProject.connectedName}
                    </a>
                  )}
                </div>

                {/* Live Preview */}
                <div className="w-full h-[50vh] rounded-xl overflow-hidden bg-foreground/5 relative">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-foreground/10 flex items-center justify-between px-4 z-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-text-light/40 text-xs">{selectedProject.url}</span>
                  </div>
                  <iframe
                    src={selectedProject.url}
                    className="w-full h-full pt-10 border-none"
                    title={selectedProject.name}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-top-navigation-by-user-activation"
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const ProjectCard = ({ project, onClick, index }: ProjectCardProps) => {
  const { projectBoxRef } = useProjectScaleAnimation({
    startTrigger: 0.3 + index * 0.1,
    endTrigger: 0.7 + index * 0.1,
    direction: index % 2 === 0 ? 'left' : 'right'
  });

  return (
    <div
      ref={projectBoxRef}
      onClick={onClick}
      className="group cursor-pointer p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-pink-accent/30 transition-all duration-500 hover:bg-foreground/10"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-foreground/5 p-1.5 flex-shrink-0">
          <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-light group-hover:text-pink-accent transition-colors">{project.name}</h3>
          <p className="text-text-light/60 text-sm">{project.tagline}</p>
        </div>
      </div>

      <p className="text-text-light/70 text-sm leading-relaxed mb-4 line-clamp-2">{project.motivation}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tools.slice(0, 3).map((tool) => (
          <span key={tool} className="px-2 py-0.5 text-xs tracking-wider uppercase bg-foreground/5 text-text-light/60 rounded-full">
            {tool}
          </span>
        ))}
        {project.tools.length > 3 && (
          <span className="px-2 py-0.5 text-xs text-text-light/40">+{project.tools.length - 3}</span>
        )}
      </div>

      {project.connectedUrl && (
        <div className="flex items-center gap-2 text-xs text-text-light/50">
          <Link2 className="w-3 h-3" />
          <span>Connected to {project.connectedName}</span>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-pink-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View Details</span>
        <ExternalLink className="w-4 h-4" />
      </div>
    </div>
  );
};

export default PastProjectsSection;
