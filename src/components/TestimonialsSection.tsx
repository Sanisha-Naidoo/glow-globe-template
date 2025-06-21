
import { useSplitTransition } from '../hooks/useSplitTransition';

const TestimonialsSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.1 });

  const testimonials = [
    {
      quote: "The level of craft and attention to detail is simply extraordinary. Every interaction feels intentional and beautiful.",
      author: "Sarah Chen",
      title: "Creative Director",
      company: "Lumina Studios"
    },
    {
      quote: "Working together transformed our digital presence into something truly cinematic. The results exceeded our wildest expectations.",
      author: "Marcus Rodriguez",  
      title: "CEO",
      company: "Velocity Brands"
    },
    {
      quote: "A rare combination of technical mastery and artistic vision. The project delivered both innovation and elegance.",
      author: "Elena Vasquez",
      title: "Design Lead", 
      company: "Future Collective"
    }
  ];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="min-h-screen py-32 relative bg-gradient-to-b from-stone-100 to-neutral-50"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-extralight text-stone-800 mb-8 tracking-[0.03em]">
            Testimonials
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-stone-400 to-transparent mx-auto mb-12"></div>
          <p className="text-xl text-stone-600 font-light leading-[1.8] tracking-wide">
            Trusted by visionary leaders and creative teams
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/40 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-10 hover:bg-white/60 hover:border-stone-300/70 hover:shadow-2xl hover:-translate-y-6 transition-all duration-700 ease-out"
            >
              <div className="space-y-8">
                <div className="text-4xl text-stone-300 font-light leading-none">"</div>
                
                <blockquote className="text-stone-700 leading-[1.9] font-light text-lg tracking-wide italic">
                  {testimonial.quote}
                </blockquote>
                
                <div className="border-t border-stone-200/60 pt-8 space-y-2">
                  <p className="text-stone-800 font-light text-base tracking-wide">{testimonial.author}</p>
                  <p className="text-stone-500 text-sm font-light tracking-wide">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="absolute top-8 right-8 w-3 h-3 bg-stone-300/40 rounded-full group-hover:bg-stone-400/60 group-hover:scale-125 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
