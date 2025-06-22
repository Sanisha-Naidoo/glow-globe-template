
import { useRef } from 'react';

interface WorkScreen {
  title: string;
  subtitle: string;
  content: string;
  projects: string[];
}

interface GalleryContentProps {
  workScreens: WorkScreen[];
  currentIndex: number;
}

const GalleryContent = ({ workScreens, currentIndex }: GalleryContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="h-full flex transition-transform duration-500 ease-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {workScreens.map((screen, index) => (
        <div
          key={index}
          className="w-full h-full flex-shrink-0 flex items-center justify-center px-16 pt-20 pb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-xs font-normal tracking-widest text-gray-200 uppercase block mb-4">
                {screen.subtitle}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white mb-8 tracking-wide leading-tight">
                {screen.title}
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mx-auto mb-8"></div>
            </div>

            <p className="text-lg md:text-xl text-gray-100 mb-12 font-normal leading-relaxed tracking-wide max-w-3xl mx-auto">
              {screen.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {screen.projects.map((project, projectIndex) => (
                <div
                  key={projectIndex}
                  className="group relative p-6 backdrop-blur-3xl bg-gradient-to-br from-slate-800/8 to-slate-600/4 border border-slate-600/15 rounded-sm hover:border-slate-500/25 transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-2 cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label={`Explore ${project}`}
                >
                  <h3 className="text-base md:text-lg font-normal text-white group-hover:text-gray-100 transition-colors duration-500 tracking-wide mb-4">
                    {project}
                  </h3>
                  
                  <div className="flex items-center space-x-3 text-gray-200 group-hover:text-gray-100 transition-colors duration-500">
                    <span className="text-xs font-normal tracking-wider uppercase">Explore</span>
                    <div className="w-6 h-px bg-gradient-to-r from-gray-200 to-transparent group-hover:w-12 transition-all duration-500"></div>
                  </div>

                  <div className="absolute top-4 right-4 w-1 h-1 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryContent;
