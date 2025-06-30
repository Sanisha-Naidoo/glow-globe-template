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

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        await fetch('https://preloved-shoes.lovable.app/', {
          method: 'HEAD',
          mode: 'no-cors'
        });
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
      className="min-h-screen py-16 relative bg-dark-bg"
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <div
            ref={sectionRef}
            className="space-y-12 mb-20"
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-4xl lg:text-5xl text-white font-bold tracking-tight text-shadow-lg">
              Vision
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-pink-accent to-transparent"></div>
            <p className="text-lg text-gray-300 leading-relaxed font-light text-shadow-sm">
              PreLOVED app is a standalone PWA built to support the tracking of donated shoes from
              the collection to the distribution, connecting givers with receivers. The future state
              is to collect data to support manufacturers. The aim of the app is to close gaps in
              the circular economy. It is a non profit project.
            </p>
          </div>

        {/* ✅ Project Preview Frame (Centered) */}
<div className="flex justify-center px-4 mb-16">
  <div
    ref={projectBoxRef}
    className="w-full max-w-6xl h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative"
  >
    {/* Header */}
    <div className="absolute top-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10 rounded-t-3xl">
      <div className="flex items-center space-x-4">
        <h3 className="text-white font-bold text-xl">PreLOVED Shoes</h3>
        <span className="text-white/70 text-sm font-light">Circular Economy Platform</span>
      </div>
      {publishDate && (
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-pink-accent animate-pulse"></div>
          <p className="text-pink-accent text-sm font-semibold uppercase">{publishDate}</p>
        </div>
      )}
    </div>

    {/* Iframe */}
    <iframe
      src="https://preloved-shoes.lovable.app/"
      className="w-full h-full pt-16 border-none"
      title="PreLOVED Shoes App"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-top-navigation-by-user-activation"
      style={{
        pointerEvents: 'auto',
        touchAction: 'auto',
      }}
    />
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
