import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useProjectScaleAnimation } from '../hooks/useProjectScaleAnimation';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const AboutSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.1 });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

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


  return (
   <section
  id="about"
  ref={parallaxRef}
  className="min-h-screen py-16 relative"
  style={{
    willChange: 'transform',
    background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.1) 0%, rgba(15, 23, 42, 0.3) 70%, rgba(2, 6, 23, 0.8) 100%)'
  }}
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
            <p className="text-base text-pink-accent leading-relaxed font-light text-shadow-sm mt-4">
              You can interact with the live app previews below — try clicking, scrolling, and exploring the interface to see the functionality in action.
            </p>
          </div>

        {/* ✅ Project Preview Frame (Centered) */}
<div className="flex justify-center items-center px-4 mb-16 overflow-visible">
  <div className="w-full max-w-7xl flex items-center justify-center lg:justify-between gap-8">
    <div
      ref={projectBoxRef}
      className="w-full max-w-5xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative transition-transform duration-300 ease-out"
      style={{ transformOrigin: 'left center' }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center px-6 z-10 rounded-t-3xl">
        <div className="flex items-center space-x-4">
          <h3 className="text-white font-bold text-xl">PreLOVED Shoes</h3>
          <span className="text-white/70 text-sm font-light">Circular Economy Platform</span>
        </div>
      </div>

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
    
    <div
      ref={useProjectScaleAnimation({ startTrigger: 0.25, endTrigger: 0.65, direction: 'right' }).projectBoxRef}
      className="hidden lg:block text-right"
    >
      <h3 className="text-white text-2xl xl:text-3xl font-bold leading-tight">
        <span className="block">Register</span>
        <span className="block">your</span>
        <span className="block text-pink-accent">shoes</span>
      </h3>
    </div>
  </div>
</div>

{/* Mobile text for first iframe */}
<div className="lg:hidden flex justify-center px-4 mb-8">
  <div
    ref={useProjectScaleAnimation({ startTrigger: 0.25, endTrigger: 0.65, direction: 'right' }).projectBoxRef}
    className="text-center"
  >
    <h3 className="text-white text-xl sm:text-2xl font-bold">
      Register your <span className="text-pink-accent">shoes</span>
    </h3>
  </div>
</div>
          {/* Second iframe – scrolls in from the right */}
<div className="flex justify-center items-center px-4 mb-16 overflow-visible">
  <div className="w-full max-w-7xl flex items-center justify-center lg:justify-between gap-8">
    <div
      ref={useProjectScaleAnimation({ startTrigger: 0.55, endTrigger: 0.85, direction: 'left' }).projectBoxRef}
      className="hidden lg:block text-left"
    >
      <h3 className="text-white text-2xl xl:text-3xl font-bold leading-tight">
        <span className="block">...which</span>
        <span className="block">triggers</span>
        <span className="block">a tracking</span>
        <span className="block text-pink-accent">system</span>
      </h3>
    </div>

    <div
      ref={useProjectScaleAnimation({ startTrigger: 0.5, endTrigger: 0.9, direction: 'right' }).projectBoxRef}
      className="w-full max-w-5xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative transition-transform duration-300 ease-out"
      style={{ transformOrigin: 'right center' }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10 rounded-t-3xl">
        <div className="flex items-center space-x-4">
          <h3 className="text-white font-bold text-xl">Shoe Store</h3>
          <span className="text-white/70 text-sm font-light">Database of shoes collected</span>
        </div>
      </div>

      <iframe
        src="https://shoe-store.lovable.app/"
        className="w-full h-full pt-16 border-none"
        title="Shoe Store App"
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

{/* Mobile text for second iframe */}
<div className="lg:hidden flex justify-center px-4 mb-8">
  <div
    ref={useProjectScaleAnimation({ startTrigger: 0.55, endTrigger: 0.85, direction: 'left' }).projectBoxRef}
    className="text-center"
  >
    <h3 className="text-white text-xl sm:text-2xl font-bold">
      ...which triggers a <span className="text-pink-accent">tracking system</span>
    </h3>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
