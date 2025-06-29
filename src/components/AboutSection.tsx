
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
              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light text-shadow-md">
                I craft digital experiences that transcend the ordinary — where every interaction 
                feels cinematic, every transition tells a story, and every moment captivates through 
                the seamless fusion of motion design and human psychology.
              </p>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light text-shadow-sm">
                PreLOVED app is a standalone PWA built to support the tracking of donated shoes from the collection to the distribution, connecting givers with receivers. The future state is to collect data to support manufacturers. The aim of the app is to close gaps in the circular economy. It is a non profit project.
              </p>
            </div>
          </div>

          {/* PreLOVED Project Preview */}
          <div className="relative h-[120vh] flex items-center justify-center">
            <div 
              ref={projectBoxRef}
              className="absolute left-1/2 top-1/2"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="relative w-[90vw] max-w-6xl h-[80vh] max-h-[900px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-700 shadow-2xl">
                <div className="absolute top-6 left-6 flex space-x-3 z-10">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
                
                {/* Project Title and Info */}
                <div className="absolute top-6 right-6 z-10 text-right">
                  <h3 className="text-white font-bold text-lg">PreLOVED Shoes</h3>
                  {publishDate && (
                    <p className="text-gray-400 text-sm">{publishDate}</p>
                  )}
                </div>

                {/* Embedded PreLOVED App */}
                <iframe
                  src="https://preloved-shoes.lovable.app/"
                  className="w-full h-full border-0 bg-white"
                  title="PreLOVED Shoes App"
                  loading="lazy"
                  style={{ marginTop: '60px', height: 'calc(100% - 60px)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
