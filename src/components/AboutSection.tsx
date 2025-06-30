
import { useRef, useEffect, useState } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useProjectScaleAnimation } from '../hooks/useProjectScaleAnimation';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const AboutSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.1 });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();
  const [publishDate, setPublishDate] = useState<string>('');
  
  const { projectBoxRef } = useProjectScaleAnimation({
    startTrigger: 0.2,
    endTrigger: 0.7
  });

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (parallaxRef.current) {
        const aboutProgress = Math.max(0, Math.min(1, (progress - 0.2) * 2));
        const translateY = -aboutProgress * 6;
        const scale = 1 - aboutProgress * 0.015;
        
        parallaxRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  // Attempt to fetch project metadata (this may not work due to CORS)
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // This is a basic attempt - may not work due to CORS restrictions
        const response = await fetch('https://preloved-shoes.lovable.app/', {
          method: 'HEAD',
          mode: 'no-cors'
        });
        
        // Since we can't actually read the response due to CORS,
        // we'll set a default date
        setPublishDate('Recently updated on Lovable');
      } catch (error) {
        setPublishDate('Built with Lovable');
      }
    };

    fetchProjectData();
  }, []);

  return (
    <section 
      id="about" 
      ref={parallaxRef}
      className="min-h-screen py-8 md:py-12 lg:py-16 relative bg-dark-bg"
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={sectionRef}
            className="space-y-8 md:space-y-12 lg:space-y-16 mb-16 md:mb-20 lg:mb-24"
            style={{ willChange: 'transform, opacity' }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-8 md:mb-12 tracking-tight text-shadow-lg">
                Vision
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-pink-accent to-transparent mb-12 md:mb-16 lg:mb-20"></div>
            </div>
            
            <div className="max-w-3xl space-y-8">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light text-shadow-sm">
                PreLOVED app is a standalone PWA built to support the tracking of donated shoes from the collection to the distribution, connecting givers with receivers. The future state is to collect data to support manufacturers. The aim of the app is to close gaps in the circular economy. It is a non profit project.
              </p>
            </div>
          </div>

          {/* PreLOVED Project Preview - Responsive and non-overlapping */}
<div className="w-full flex justify-center py-12">
  <div
    ref={projectBoxRef}
    className="w-[90vw] max-w-6xl h-[70vh] max-h-[800px] relative rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:p-px before:bg-gradient-to-br before:from-white/20 before:to-transparent before:mask-composite-exclude before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
  >
    {/* Glass frame header */}
    <div className="absolute top-0 left-0 right-0 h-16 backdrop-blur-md bg-white/10 border-b border-white/10 flex items-center justify-between px-8 z-10 rounded-t-3xl">
      <div className="flex items-center space-x-4">
        <h3 className="text-white font-bold text-xl tracking-tight">PreLOVED Shoes</h3>
        <div className="w-px h-6 bg-white/20"></div>
        <span className="text-white/70 text-sm font-light">Circular Economy Platform</span>
      </div>

      {publishDate && (
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-pink-accent animate-pulse"></div>
          <p className="text-pink-accent font-semibold text-sm tracking-wide uppercase">
            {publishDate}
          </p>
        </div>
      )}
    </div>

    {/* Embedded PreLOVED App */}
    <div className="absolute top-16 inset-x-0 bottom-0">
      <iframe
        src="https://preloved-shoes.lovable.app/"
        className="w-full h-full border-0 bg-white rounded-b-3xl"
        title="PreLOVED Shoes App"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-top-navigation-by-user-activation"
        style={{ pointerEvents: 'auto', touchAction: 'auto' }}
      />
    </div>

    {/* Glow */}
    <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-pink-accent/20 via-transparent to-white/10 opacity-50 pointer-events-none"></div>
  </div>
</div>

                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-pink-accent/20 via-transparent to-white/10 opacity-50 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
