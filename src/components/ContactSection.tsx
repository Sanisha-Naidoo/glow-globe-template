
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactSection = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-8 md:py-12 lg:py-16 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out bg-dark-bg flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Footer with Quote */}
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-6 md:mb-8 text-shadow-md italic">
              "Where there is love, there is always time and nothing is too much trouble"
            </p>
            <p className="text-xl text-pink-accent/80 font-semibold tracking-wide mb-8 md:mb-12 text-shadow-sm">
              — Abdu'l‑Baha
            </p>
            <p className="text-white font-medium text-lg tracking-widest uppercase text-shadow-md">
              © 2024 — Crafted with intention and care
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
