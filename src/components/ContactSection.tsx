import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Button } from './ui/button';
import { Linkedin, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useScrollAnimation();
  return <section id="contact" ref={sectionRef} className="min-h-screen py-8 md:py-12 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out bg-dark-bg flex items-center justify-center lg:py-0">
      <div className="max-w-6xl mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Footer with Quote */}
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-white font-light leading-relaxed mb-4 md:mb-6 text-shadow-sm italic">
              "Where there is love, there is always time and nothing is too much trouble"
            </p>
            <p className="text-base text-pink-accent/80 font-medium tracking-wide mb-6 md:mb-8 text-shadow-sm">
              — Abdu'l‑Baha
            </p>
            
        
            </div>

            {/* Elegant Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                asChild
              >
                <a href="https://sanisha.imaginationlab.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Personal Website
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                asChild
              >
                <a href="https://www.linkedin.com/in/sanishacnaidoo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
            
            <p className="text-white font-light text-sm tracking-wide uppercase text-shadow-sm">
              © 2024 — Crafted with intention and care
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;
