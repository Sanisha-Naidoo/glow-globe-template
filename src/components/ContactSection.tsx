
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactSection = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-32 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out bg-dark-bg"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          {/* Feedback Form */}
          <div className="mb-32">
            <div className="backdrop-blur-3xl bg-black/30 border border-gray-700 rounded-2xl p-12 shadow-2xl">
              <div className="mb-12">
                <h3 className="text-4xl text-white mb-6 tracking-tight font-bold text-shadow-lg">
                  Share Your Thoughts
                </h3>
                <p className="text-xl text-white font-medium leading-relaxed text-shadow-md">
                  What do you think about the projects above? Your feedback helps shape the creative direction.
                </p>
              </div>
              
              <form className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-white mb-4 text-lg font-semibold tracking-wider uppercase text-shadow-md">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-pink-accent transition-colors duration-700 font-medium tracking-wide text-lg"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-4 text-lg font-semibold tracking-wider uppercase text-shadow-md">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-pink-accent transition-colors duration-700 font-medium tracking-wide text-lg"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white mb-4 text-lg font-semibold tracking-wider uppercase text-shadow-md">
                    Feedback
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-pink-accent transition-colors duration-700 resize-none font-medium tracking-wide leading-relaxed text-lg"
                    placeholder="What are your thoughts on these projects?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="group relative px-12 py-6 bg-gradient-to-r from-pink-accent/20 to-pink-accent/20 border border-pink-accent/50 hover:border-pink-accent/70 text-white hover:text-white transition-all duration-700 font-semibold tracking-wider text-lg uppercase backdrop-blur-sm rounded-xl shadow-lg"
                >
                  Send Feedback
                  <div className="absolute inset-0 bg-pink-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-pink-accent to-transparent group-hover:w-full transition-all duration-1000 ease-out"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Connect Section */}
          <div className="grid lg:grid-cols-2 gap-32 mb-32">
            <div className="space-y-16">
              <div>
                <h2 className="text-4xl text-white mb-12 tracking-tight font-bold text-shadow-lg">
                  Connect
                </h2>
                <div className="w-20 h-px bg-gradient-to-r from-pink-accent to-transparent mb-16"></div>
                <p className="text-xl text-white font-medium leading-relaxed tracking-wide text-shadow-md">
                  Let's explore the possibilities of creating something extraordinary together.
                </p>
              </div>

              <div className="space-y-12">
                {[
                  { label: 'Email', value: 'create@yourname.com', link: 'mailto:create@yourname.com' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com' },
                  { label: 'Behance', value: 'behance.net/yourprofile', link: 'https://behance.net' }
                ].map((contact, index) => (
                  <div key={index} className="group border-l-2 border-pink-accent pl-8 hover:border-pink-accent/80 transition-colors duration-700 bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:bg-black/30 hover:border-gray-600 shadow-lg">
                    <p className="text-lg font-semibold tracking-widest text-pink-accent/90 mb-3 uppercase text-shadow-sm">
                      {contact.label}
                    </p>
                    <a 
                      href={contact.link}
                      className="text-white hover:text-pink-accent transition-colors duration-500 font-medium text-lg tracking-wide text-shadow-md"
                    >
                      {contact.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Quote */}
          <div className="text-center pt-16 border-t border-gray-700">
            <p className="text-xl text-white font-medium leading-relaxed mb-6 text-shadow-md italic">
              "Where there is love, there is always time and nothing is too much trouble"
            </p>
            <p className="text-lg text-pink-accent/80 font-semibold tracking-wide mb-8 text-shadow-sm">
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
