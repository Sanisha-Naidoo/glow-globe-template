
import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return elementRef;
};

export const useScrollNavigation = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let isHoveringTop = false;

    const showNav = () => {
      if (!navRef.current) return;
      navRef.current.classList.add('nav-visible');
      navRef.current.classList.remove('nav-hidden');
    };

    const hideNav = () => {
      if (!navRef.current) return;
      navRef.current.classList.add('nav-hidden');
      navRef.current.classList.remove('nav-visible');
    };

    const handleScroll = () => {
      if (!navRef.current) return;
      
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.5;
      
      if (scrollY > triggerPoint || isHoveringTop) {
        showNav();
      } else {
        hideNav();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const hoverZone = 80; // pixels from top
      const wasHovering = isHoveringTop;
      isHoveringTop = e.clientY <= hoverZone;
      
      if (isHoveringTop !== wasHovering) {
        handleScroll();
      }
    };

    const handleMouseLeave = () => {
      isHoveringTop = false;
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return navRef;
};
