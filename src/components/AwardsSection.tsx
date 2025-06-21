
import { useSplitTransition } from '../hooks/useSplitTransition';

const AwardsSection = () => {
  const sectionRef = useSplitTransition({ direction: 'left', triggerPoint: 0.1 });

  const awards = [
    {
      year: "2024",
      title: "Excellence in Digital Innovation",
      organization: "Design Awards International",
      category: "Interactive Media"
    },
    {
      year: "2024", 
      title: "Best Motion Design",
      organization: "Creative Arts Society",
      category: "Web Animation"
    },
    {
      year: "2023",
      title: "Outstanding User Experience",
      organization: "UX Design Council",
      category: "Interaction Design"
    },
    {
      year: "2023",
      title: "Innovation in Web Technology", 
      organization: "Tech Innovators Guild",
      category: "Creative Technology"
    }
  ];

  return (
    <section 
      id="awards" 
      ref={sectionRef}
      className="min-h-screen py-32 relative bg-gradient-to-b from-neutral-50 to-stone-100"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-6xl md:text-7xl font-extralight text-stone-800 mb-8 tracking-[0.03em]">
                Recognition
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-stone-400 to-transparent mb-12"></div>
              <p className="text-xl text-stone-600 font-light leading-[1.8] tracking-wide">
                Honored by peers and industry leaders for excellence in digital craft and innovation.
              </p>
            </div>
            
            {/* Floating achievement card */}
            <div className="bg-white/50 backdrop-blur-sm border border-stone-200/60 rounded-xl p-8 hover:bg-white/70 hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-stone-300/60 to-stone-400/40 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-stone-600 rounded-full"></div>
                </div>
                <h4 className="text-lg font-light text-stone-800 tracking-wide">Featured Work</h4>
                <p className="text-stone-600 font-light leading-relaxed">
                  Selected projects showcased in leading design publications and industry conferences worldwide.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="group relative bg-white/30 backdrop-blur-sm border border-stone-200/50 rounded-xl p-8 hover:bg-white/50 hover:border-stone-300/70 hover:shadow-lg hover:scale-[1.02] transition-all duration-600 ease-out"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-2xl font-extralight text-stone-400 tracking-wider">{award.year}</span>
                  <div className="w-2 h-2 bg-stone-300/60 rounded-full group-hover:bg-stone-400 group-hover:scale-150 transition-all duration-400"></div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-stone-800 tracking-wide leading-tight">
                    {award.title}
                  </h3>
                  <p className="text-stone-600 font-light tracking-wide">{award.organization}</p>
                  <span className="inline-block text-xs text-stone-500 font-light tracking-wider uppercase bg-stone-100/60 px-3 py-1 rounded-full">
                    {award.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
