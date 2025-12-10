import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Button } from './ui/button';
import { Linkedin, ExternalLink, ArrowUp } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useScrollAnimation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative opacity-0 translate-y-8 transition-all duration-1000 ease-out bg-dark-bg flex flex-col items-center justify-center"
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Quote */}
        <blockquote className="mb-16">
          <p className="text-2xl md:text-3xl text-text-light font-light leading-relaxed mb-6 italic">
            "Where there is love, there is always time and nothing is too much trouble"
          </p>
          <cite className="text-base text-cyan-accent font-medium tracking-wide not-italic">
            — 'Abdu'l‑Bahá
          </cite>
        </blockquote>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-accent to-transparent mx-auto mb-16" />

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Button
            variant="outline"
            className="bg-foreground/5 border-foreground/10 text-text-light hover:bg-foreground/10 hover:border-cyan-accent/30 transition-all duration-300 px-6 py-3 text-base"
            asChild
          >
            <a
              href="https://sanisha.imaginationlab.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              Personal Website
            </a>
          </Button>

          <Button
            variant="outline"
            className="bg-foreground/5 border-foreground/10 text-text-light hover:bg-foreground/10 hover:border-cyan-accent/30 transition-all duration-300 px-6 py-3 text-base"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/sanishacnaidoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </Button>
        </div>

        {/* Copyright */}
        <p className="text-text-light/40 font-light text-sm tracking-[0.2em] uppercase mb-16">
          © 2025 IMAGINATION LAB
        </p>

        {/* Back to Top */}
        <button onClick={scrollToTop} className="group">
          <div className="flex flex-col items-center space-y-3 text-text-light/40 hover:text-cyan-accent transition-all duration-300">
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-sm tracking-[0.2em] uppercase">Back to Top</span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
