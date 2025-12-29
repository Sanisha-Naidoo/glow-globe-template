import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useProjectScaleAnimation } from '../hooks/useProjectScaleAnimation';
import { useIsMobile } from '../hooks/use-mobile';
import { ExternalLink, Link2 } from 'lucide-react';
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
  const isMobile = useIsMobile();

  const projects: Project[] = [
    {
      name: 'Trustee App',
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
      className="min-h-screen py-16 sm:py-32 relative bg-dark-bg opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-20">
          <p className="text-sm tracking-[0.3em] text-cyan-accent uppercase mb-4 sm:mb-6">Portfolio</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-text-light font-bold tracking-tight mb-6 sm:mb-8">
            Past Projects
          </h2>
          <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-cyan-accent to-violet-accent" />
        </div>

        {/* Projects Grid - Stacked Vertically */}
        <div className="flex flex-col gap-10">
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
        <DialogContent className="w-full max-w-[92vw] sm:max-w-6xl max-h-[90vh] sm:max-h-[90vh] overflow-y-auto bg-dark-bg border-foreground/10 pt-14 sm:pt-6">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-foreground/5 p-3">
                    <img src={selectedProject.logo} alt={selectedProject.name} className="w-full h-full object-contain rounded-xl sm:rounded-2xl" />
                  </div>
                  <div>
                    <DialogTitle className="text-3xl font-bold text-text-light">{selectedProject.name}</DialogTitle>
                    <p className="text-text-light/60 text-lg">{selectedProject.tagline}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                <p className="text-text-light/70 text-lg leading-relaxed">{selectedProject.description}</p>
                
                <div>
                  <h4 className="text-sm tracking-[0.2em] text-cyan-accent uppercase mb-4">Motivation</h4>
                  <p className="text-text-light/70 text-base leading-relaxed">{selectedProject.motivation}</p>
                </div>

                <div>
                  <h4 className="text-sm tracking-[0.2em] text-cyan-accent uppercase mb-4">Tools Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="px-4 py-2 text-sm tracking-wider uppercase bg-foreground/5 text-text-light/80 rounded-full border border-foreground/10">
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
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-accent to-violet-accent text-dark-bg rounded-lg font-medium text-base hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit {selectedProject.name}
                  </a>
                  {selectedProject.connectedUrl && (
                    <a
                      href={selectedProject.connectedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-foreground/10 text-text-light rounded-lg font-medium text-base hover:bg-foreground/20 transition-colors"
                    >
                      <Link2 className="w-5 h-5" />
                      Connected: {selectedProject.connectedName}
                    </a>
                  )}
                </div>

                {/* Live Preview */}
                <div className="w-full h-[55vh] rounded-xl overflow-hidden bg-foreground/5 relative">
                  <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 bg-foreground/10 flex items-center justify-between px-3 sm:px-5 z-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-foreground/20" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-foreground/20" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-foreground/20" />
                    </div>
                    <span className="text-text-light/40 text-xs sm:text-sm truncate max-w-[60%]">{selectedProject.url}</span>
                  </div>
                  {/* Iframe container with scaling for mobile */}
                  <div 
                    className="absolute inset-0 pt-10 sm:pt-12 origin-top-left"
                    style={{
                      width: isMobile ? '166.67%' : '100%',
                      height: isMobile ? '166.67%' : '100%',
                      transform: isMobile ? 'scale(0.6)' : 'none',
                    }}
                  >
                    <iframe
                      src={selectedProject.url}
                      className="w-full h-full border-none"
                      title={selectedProject.name}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-top-navigation-by-user-activation"
                    />
                  </div>
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
      className="group cursor-pointer p-6 sm:p-10 rounded-xl sm:rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-cyan-accent/30 transition-all duration-500 hover:bg-foreground/10 w-full"
    >
      <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-foreground/5 p-1.5 sm:p-2 flex-shrink-0">
          <img src={project.logo} alt={project.name} className="w-full h-full object-contain rounded-xl sm:rounded-2xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-text-light group-hover:text-cyan-accent transition-colors mb-1 sm:mb-2">{project.name}</h3>
          <p className="text-text-light/60 text-sm sm:text-base">{project.tagline}</p>
        </div>
      </div>

      <p className="text-text-light/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{project.motivation}</p>

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        {project.tools.map((tool) => (
          <span key={tool} className="px-3 py-1.5 text-sm tracking-wider uppercase bg-foreground/5 text-text-light/60 rounded-full">
            {tool}
          </span>
        ))}
      </div>

      {project.connectedUrl && (
        <div className="flex items-center gap-2 text-sm text-text-light/50 mb-4">
          <Link2 className="w-4 h-4" />
          <span>Connected to {project.connectedName}</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-cyan-accent text-base opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View Details</span>
        <ExternalLink className="w-5 h-5" />
      </div>
    </div>
  );
};

export default PastProjectsSection;
